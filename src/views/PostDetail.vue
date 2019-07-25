<template>
  <div class="stars postdetail">
    <!-- <div class="stars"> -->
      <div class="twinkling">
      </div>
    <!-- </div> -->
    <v-container id="postcard" class="mt-3">
      <v-layout my-5 wrap>
        <v-flex xs12 sm8 offset-sm2 mt-5>
          <v-card>
          <v-card-title primary-title class="pb-2 pt-2">
            <h2 class="color-333 headline font-weight-heavy mt-2 mb-1 ml-1">{{post.title}}</h2>
            <v-spacer></v-spacer>
            <div class="caption grey--text" style="padding-top:30px;">{{formatedDate}}</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p v-html="post.body" class="color-666 font-weight-light subheading mt-2 ml-1"></p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-0 bg-1">
            <div class="ml-2">
              <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
            </div>
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
                body: post.body
              }}">
              <button v-if="post.user == userEmail" class="button button--wayra button--border-medium button--text-medium button--size-s" 
              style="max-width:150px; padding:0.5em 1em; margin:0.5em;">
                수정하기
              </button>
            </router-link>
            <router-link to="/post">
              <button v-if="post.user == userEmail" v-on:click="deletePost" class="button button--wayra button--border-thin button--text-medium button--size-s" 
              style="max-width:150px; padding:0.5em 1em; margin:0.5em;">
                삭제하기
              </button>
            </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PostList from "../components/post/PostList";
import FirebaseService from "@/services/FirebaseService";

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
      */
    }
  },
  computed: {
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
    },
    deletePost() {
      FirebaseService.deletePost(this.$route.params.id)
    }
  }
};
</script>

<style>

.postdetail.stars{
  position:relative;
}
#postcard{
  position:relative;
  z-index:10;
}
</style>
