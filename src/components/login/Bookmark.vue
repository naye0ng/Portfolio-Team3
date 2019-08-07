<template>
  <v-layout row justify-center wrap>
    <!-- Portfolio -->
    <v-flex xs12 v-if="userports">
      <v-layout row wrap mw-700 class="bg-3">
        <v-flex xs12>
          <h2
            class="mb-5 mt-0 text-xs-center text-shadow homepage-title"
            style="color:#fff;font-size:3.4vw;"
          >Portfolio Bookmarks</h2>
        </v-flex>
        <v-flex v-for="i in userports.length > portlimit ? portlimit : userports.length" xs12 md6 px-3>
          <!-- Give post infomation to each Post.vue -->
          <Portfolio class="ma-3"
            :email="userports[i - 1].user"
            :date="userports[i - 1].created_at.toString()"
            :title="userports[i - 1].title"
            :body="userports[i - 1].body"
            :imgSrc="userports[i - 1].img"
            :id="userports[i - 1].id"
            >
          </Portfolio>
        </v-flex>
        <v-flex xs12 text-xs-center round my-5 v-if="loadmoreport && userports && userports.length>0" class="bg-1">
          <button v-on:click="loadMorePortfolios" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
            더 보기
          </button>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- Post -->
    <v-flex xs12 v-if="userposts">
      <v-layout row wrap mw-700 class="bg-3">
        <v-flex xs12>
          <h2
            class="mb-5 mt-0 text-xs-center text-shadow homepage-title"
            style="color:#fff;font-size:3.4vw;"
          >Post Bookmarks</h2>
        </v-flex>
        <v-flex v-for="i in userposts.length > postlimit ? postlimit : userposts.length" xs12 px-3>
          <!-- Give post infomation to each Post.vue -->
          <Post class="ma-3"
            :email="userposts[i - 1].user"
            :date="userposts[i - 1].created_at"
            :title="userposts[i - 1].title"
            :body="userposts[i - 1].body"
            :id="userposts[i - 1].id"
            :tag="userposts[i-1].tag"
            >
          </Post>
        </v-flex>
        <v-flex xs12 text-xs-center round my-5 v-if="loadmorepost && userposts && userposts.length>0" class="bg-1">
          <button v-on:click="loadMorePosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
            더 보기
          </button>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import FirebaseService from '@/services/FirebaseService';
import Portfolio from "@/components/portfolio/Portfolio";
import Post from "@/components/post/Post";

export default {
  name: "Bookmark",
  components : {
    Portfolio,
    Post,
  },
  props:{
    useremail: {type: String},
    portfolios: {type: Array},
    posts: {type: Array},
  },
  data() {
    return {
      userports:[],
      userposts:[],
      portlimit:4,
      postlimit:4,
      user: "",
      loadmoreport:true,
      loadmorepost:true,
      postss: this.posts,
      portfolioss: this.portfolioss,
    }
  },
  methods: {
    async getUserPortfolios(){
      await this.portfolioss.filter(port=>{
        return FirebaseService.getPortLikers(port.id).then(likers=>{
          for(var i=0;i<likers.length; i++){
            if (likers[i].user==this.useremail){
              this.userports.push(port);
              break;
            }
          }
        })
      })
    },
    async getUserPosts(){
      await this.postss.filter(post=>{
        return FirebaseService.getPostLikers(post.id).then(likers=>{
          for(var i=0;i<likers.length; i++){
            if (likers[i].user==this.useremail){
              this.userposts.push(post);
              break;
            }
          }
        })
      })
    },
    loadMorePortfolios() {
      this.loadmoreport = true;
      this.portlimit += 4;
    },
    loadMorePosts() {
      this.loadmorepost = true;
      this.postlimit += 4;
    }
  },
  watch:{
    portfolios: function(){
      this.portfolioss = this.portfolios
      this.getUserPortfolios();
    },
    posts: function(){
      this.postss = this.posts
      this.getUserPosts();
    }
  }
};
</script>
<style>
* {
  z-index: 99;
}
</style>
