<template>
  <v-layout align-center justify-center row fill-height style="background-color:#000000;">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div>
    <v-container id="postcard" class="mt-3">
      <v-layout my-5 wrap justify-center row>
        <v-flex xs8 sm6 mt-5>
          <v-card>
            <v-card-title primary-title class="pb-2 pt-2">
              <h2 class="color-333 headline font-weight-heavy mt-2 mb-1 ml-1">{{post.title}}</h2>
              <v-spacer></v-spacer>
              <div class="caption grey--text pt-4">
                <v-avatar size="35px">
                  <img :src="userimg" alt="">
                </v-avatar>
                {{post.user}}
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="min-height:30vh;">
              <p v-html="post.body" class="color-666 font-weight-light subheading mt-2 ml-1" style="word-break: break-all;"></p>
            </v-card-text>
            <v-card-text class="pb-1 pl-3" v-if="post">
              <span style="font-size:0.89rem;" class="card-media-body-supporting-bottom-text subtle" v-for="i in post.tag.length" >
                #{{post.tag[i-1]}}&nbsp;
              </span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pl-0 bg-1">
              <div class="ml-2">
                <v-btn icon v-if="curUser && liked" @click="likes">
                  <i class="material-icons" style="color:#ec407a;">
                    favorite
                  </i>
                </v-btn>
                <v-btn icon v-if="!curUser || !liked" @click="likes">
                  <i class="material-icons" style="color:#ec407a;">
                    favorite_border
                  </i>
                </v-btn>
                <!-- <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn> -->
              </div>
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
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- go back button -->
        <v-flex xs12 text-xs-center round class="bg-3">
          <router-link to="/post">
            <button class="button button--wayra button--border-medium button--text-medium button--size-s"
            style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
              리스트로
            </button>
          </router-link>
          <router-link to="/">
            <button class="button button--wayra button--border-medium button--text-medium button--size-s"
            style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
              홈으로
            </button>
          </router-link>
          <!-- EditBtn, RemoveBtn check login user's email match with post's email infomation-->
          <!-- EditBtn pass post infomation to PostWriter.vue -->
          <router-link :to="{
              name: 'makecontents',
              params: {
                kind: 'Post', // MakeContents.vue will call PostWriter.vue
                title: post.title,
                id: post.id,
                body: post.body,
                tag : post.tag,
                user : post.user
              }}">
              <button v-if="post.user == userEmail || $store.getters.dbuser.accessLevel>=2" class="button button--wayra button--border-medium button--text-medium button--size-s" 
              style="max-width:150px; padding:0.5em 1em; margin:0.5em;">
                수정하기
              </button>
            </router-link>
            <router-link to="/post">
              <button v-if="post.user == userEmail || $store.getters.dbuser.accessLevel>=2" v-on:click="deletePost" class="button button--wayra button--border-thin button--text-medium button--size-s" 
              style="max-width:150px; padding:0.5em 1em; margin:0.5em;">
                삭제하기
              </button>
            </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import PostList from "../components/post/PostList";
import FirebaseService from "@/services/FirebaseService";
import  firebase  from 'firebase';
import Swal from "sweetalert2";

export default {
  name: "PostDetail",
  components: {
    PostList
  },
  data(){
    return {
      post : "",
      /* 설명******************************
      post.title (제목)
      post.body (내용)
      post.user (해당 post의 작성자 email)
      post.created_at (게시물 생성 날짜)
      post.id (게시물 id)
      post.tag (게시물 tag)
      */
      liked:false,
      likecount:0,
      likers:[],
      dialog:false,
      userimg:'',
    }
  },
  computed: {
    curUser(){
      return this.$store.getters.getUser;
    },
    userEmail(){   // 현재 로그인한 user의 이메일값
      var user = this.$store.getters.getUser;
      if (!user) return null;
      return this.$store.getters.getUser.email
    },
    formatedDate() {
      if (this.post.created_at){
        return `${this.post.created_at.getFullYear()}년 ${this.post.created_at.getMonth()}월 ${this.post.created_at.getDate()}일`
      }
    },
  },
  mounted(){
    this.getPost();
  },
  methods:{
    async getPost(){
      this.post = await FirebaseService.getPost(this.$route.params.id);
      this.getLike();
      this.getLikeCount();
      this.getLikers();
      this.getUserImg(this.post.user);
    },
    deletePost() {
      FirebaseService.deletePost(this.$route.params.id)
    },
    filter(keyword){
      this.$store.commit('SET_searchtag',keyword);
      this.$router.push("/post");
    },
    likes(){
      if (this.$store.getters.getUser){
        if (this.liked){
          this.liked=false;
          const user=this.$store.getters.dbuser;
          FirebaseService.deletePostLike(this.post.id,user.email).then((res)=>{
            this.getLikers();
          });
        }
        else{
          this.liked=true;
          const user=this.$store.getters.dbuser;
          FirebaseService.addPostLike(this.post.id,user.email).then((res)=>{
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
        this.liked = await FirebaseService.checkPostLike(this.post.id,user.email);
      }
      else{
        this.liked = false;
      }
    },
    async getLikeCount(){
      this.likecount = await FirebaseService.getPostLikeCount(this.post.id);
    },
    async getLikers(){
      const list = await FirebaseService.getPostLikers(this.post.id);
      this.likers = [];
      list.forEach(l=>{
        firebase.database().ref("user").child(l.user.split('@')[0]).once("value")
            .then(snapshot => {
              this.likers.push({'nickname': snapshot.val().nickname,'avatar': snapshot.val().photoURL});
          })
      })
    },
    getUserImg(id){
      var key=id.split('@')[0];
      firebase.database().ref("user").child(key).child('photoURL').on("value", snapshot => {
        // console.log(snapshot.val())
        this.userimg = snapshot.val()
      })
    }
  }
};
</script>

<style>
.stars, .twinkling, .clouds {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
}
.stars {
  background:#000 url(../../public/images/stars.png) repeat top center;
  z-index:0;
}

.twinkling{
  background:transparent url(../../public/images/twinkling.png) repeat top center;
  z-index:1;

  -moz-animation:move-twink-back 200s linear infinite;
  -ms-animation:move-twink-back 200s linear infinite;
  -o-animation:move-twink-back 200s linear infinite;
  -webkit-animation:move-twink-back 200s linear infinite;
  animation:move-twink-back 200s linear infinite;
}
.clouds{
    background:transparent url(../../public/images/clouds.png) repeat top center;
    z-index:3;

  -moz-animation:move-clouds-back 200s linear infinite;
  -ms-animation:move-clouds-back 200s linear infinite;
  -o-animation:move-clouds-back 200s linear infinite;
  -webkit-animation:move-clouds-back 200s linear infinite;
  animation:move-clouds-back 200s linear infinite;
}
#postcard{
  z-index:99;
}
.twinkling{
  z-index:1;
  position:absolute;
}
</style>
