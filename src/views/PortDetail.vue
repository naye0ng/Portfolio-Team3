<template>
  <v-layout align-center justify-center row fill-height style="background-color:#000000;">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div>
    <!-- </div> -->
    <v-container id="portcard" class="mt-3">
      <v-layout my-5 wrap>
        <v-flex xs8 offset-xs2 mt-5>
          <v-card outlined style="border:1.2px solid #f7f7f7;">
            <v-card-title primary-title class="pb-2 pt-2" style="background-color:#fff;">
              <h2 class="color-333 headline font-weight-heavy mt-2 mb-1 ml-1">{{port.title}}</h2>
              <v-spacer></v-spacer>
              <v-flex hidden-xs-only class="caption grey--text pt-4 text-xs-right">{{port.user}}</v-flex>
            </v-card-title>
            <v-img
              :src="port.fireUrl"
              contain
              style="max-height:70vh; max-width:70vw; background-color:#000000;"
            ></v-img>

            <div style="background-color:#ffffff;">
              <v-card-text class="pb-0 pl-4 pt-3">
                <div v-html="port.body" style="font-size:1.24rem;word-break: break-all;"></div>
              </v-card-text>
              <v-card-actions class="pl-3 pt-0">
                <v-btn icon v-if="curUser && liked" @click="likes">
                  <i class="material-icons" style="color:#ec407a;">
                    favorite
                  </i>
                </v-btn>
                <v-btn icon v-if="!curUser || !liked" @click="likes">
                  <!-- <template v-slot:badge>{{likecount}}</template> -->
                  <i class="material-icons" style="color:#ec407a;">
                    favorite_border
                  </i>
                </v-btn>
                <!-- <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn> -->
                <div class="caption grey--text pt-1 pl-1" @click="dialog=true" style="cursor:pointer;">{{likecount}} likes </div>
                <v-dialog v-model="dialog" max-width="300px">
                  <v-card>
                    <v-card-title>
                      Likes
                    </v-card-title>
                    <v-card-text>
                      <div v-for="i in likers.length" class="py-1">
                        <v-avatar>
                          <img
                            :src="likers[i-1].avatar"
                          >
                        </v-avatar>
                        <span class="pl-3">{{likers[i-1].nickname}}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <div class="caption grey--text pt-0 pr-3">{{formatedDate}}</div>
              </v-card-actions>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- go back button -->
        <v-flex xs12 text-xs-center round class="bg-3">
          <CommentMain :port="this.port"/>          <!-- 댓글보기 --> 
          <router-link to="/portfolio">
            <button
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >리스트로</button>
          </router-link>
          <router-link to="/">
            <button
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >홈으로</button>
          </router-link>
          <!-- EditBtn, RemoveBtn check login user's email match with portfolio's email infomation-->
          <!-- EditBtn pass portfolio infomation to PortfolioWriter.vue -->
          <router-link
            :to="{
            name: 'makecontents',
            params: {
              kind: 'Portfolio', // MakeContents.vue will call PortfolioWriter.vue
              title: port.title,
              id: port.id,
              body: port.body,
              imgSrc: fireUrl,
              user: port.user
            }}"
          >
            <button
              v-if="port.user == userEmail || $store.getters.dbuser.accessLevel>=2"
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >수정하기</button>
          </router-link>
          <router-link to="/portfolio">
            <button
              v-if="port.user == userEmail || $store.getters.dbuser.accessLevel>=2"
              v-on:click="deletePortfolio"
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >삭제하기</button>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import PortfolioList from "../components/portfolio/PortfolioList";
import FirebaseService from "@/services/FirebaseService";
import CommentMain from "@/components/portfolio/CommentMain";
import  firebase  from 'firebase';
import Swal from "sweetalert2";

export default {
  name: "PortDetail",
  components: {
    PortfolioList,
    CommentMain
  },
  data() {
    return {
      port: ""
      /* 설명******************************
      port.img(해당 portfolio 의 이미지 url)
      port.title (제목)
      port.body (내용)
      port.user (해당 portfolio의 작성자 email)
      port.created_at (게시물 생성 날짜)
      port.id (게시물 id)
      */,
      liked:false,
      likecount:0,
      likers:[],
      dialog:false,
    };
  },
  computed: {
    curUser(){
      return this.$store.getters.getUser;
    },
    userEmail() {
      // 현재 로그인한 user의 이메일값
      if (!this.$store.getters.getUser) return null;
      return this.$store.getters.getUser.email;
    },
    formatedDate() {
      if (this.port.created_at){
        return `${this.port.created_at.getFullYear()}년 ${this.port.created_at.getMonth()+1}월 ${this.port.created_at.getDate()}일`
      }
    }
  },
  mounted() {
    this.getPort();
  },
  methods: {
    async getPort() {
      this.port = await FirebaseService.getPortfolio(this.$route.params.id);
      this.getLike();
      this.getLikeCount();
      this.getLikers();
    },
    deletePortfolio() {
      FirebaseService.deletePortfolio(this.port.id, this.port.fireUrl);
    },
    likes(){
      if (this.$store.getters.getUser){
        if (this.liked){
          this.liked=false;
          const user=this.$store.getters.getUser;
          FirebaseService.deletePortLike(this.port.id,user.email).then((res)=>{
            this.getLikers();
          });
        }
        else{
          this.liked=true;
          const user=this.$store.getters.getUser;
          FirebaseService.addPortLike(this.port.id,user.email).then((res)=>{
            this.getLikers();
          })
        }
        this.getLikeCount();
      }
      else{
        Swal.fire({
            text:"좋아요를 누르시려면 로그인을 해주세요",
            type: "warning"
          })
      }
      
    },
    async getLike(){
      const user = this.$store.getters.getUser;
      if (user){
        this.liked = await FirebaseService.checkPortLike(this.port.id,user.email);
      }
      else{
        this.liked = false;
      }
      
    },
    async getLikeCount(){
      this.likecount = await FirebaseService.getPortLikeCount(this.port.id);
    },
    async getLikers(){
      const list = await FirebaseService.getPortLikers(this.port.id);
      this.likers = [];
      list.forEach(l=>{
        firebase.database().ref("user").child(l.user.split('@')[0]).once("value")
            .then(snapshot => {
              this.likers.push({'nickname': snapshot.val().nickname,'avatar': snapshot.val().photoURL});
          })
      })
    }
  }
};
</script>

<style>
.stars,
.twinkling,
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.stars {
  background: #000 url(../../public/images/stars.png) repeat top center;
  z-index: 0;
}

.twinkling {
  background: transparent url(../../public/images/twinkling.png) repeat top
    center;
  z-index: 1;

  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animation: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}
.clouds {
  background: transparent url(../../public/images/clouds.png) repeat top center;
  z-index: 3;

  -moz-animation: move-clouds-back 200s linear infinite;
  -ms-animation: move-clouds-back 200s linear infinite;
  -o-animation: move-clouds-back 200s linear infinite;
  -webkit-animation: move-clouds-back 200s linear infinite;
  animation: move-clouds-back 200s linear infinite;
}
#portcard {
  position: relative;
  z-index: 99;
}

.badge {
    display: inline-block;
    min-width: 16px; /* pixel unit */
    padding: 35px 50px; /* pixel unit */
    border-radius: 50%;
    font-size: 75px;
    text-align: center;
    background: #1779ba;
    color: #fefefe;
}
</style>
