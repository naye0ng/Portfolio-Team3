<template>
  <v-layout row justify-center wrap> 
    <!-- Post -->
    <v-flex xs12 v-if="userposts">
      <v-layout row wrap class="bg-3" justify-center>
        <v-flex xs10>
          <h2
            class="mb-5 mt-0 text-xs-center text-shadow homepage-title"
            style="color:#fff;font-size:calc(3.4vw + 0.8em);"
          >내가 작성한 post</h2>
        </v-flex>
        <v-flex v-for="i in userposts.length > limit ? limit : userposts.length" xs12 px-3>
          <!-- Give post infomation to each Post.vue -->
          <Post class="mx-3"
            :email="userposts[i - 1].user"
            :date="userposts[i - 1].created_at"
            :title="userposts[i - 1].title"
            :body="userposts[i - 1].body"
            :id="userposts[i - 1].id"
            :tag="userposts[i-1].tag"
            :size="10"
            >
          </Post>
        </v-flex>
        <v-flex xs12 text-xs-center round my-4 v-if="loadmorepost && userposts && limit<userposts.length" class="bg-1">
          <button v-on:click="loadMorePosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
            더 보기
          </button>
        </v-flex>
        <v-flex xs12 text-xs-center round my-4 v-if="loadmorepost && userposts &&  userposts.length>4 && limit>=userposts.length" class="bg-1">
          <button v-on:click="foldPosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
            접기
          </button>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import Post from "@/components/post/Post";

export default {
  name: "MyPosts",
  components : {
    Post,
  },
  props:{
    useremail: {type: String},
    posts: {type: Array},
  },
  data() {
    return {
      userposts:[],
      limit:4,
      user: "",
      loadmorepost:true,
      postss:this.posts,
    }
  },
  methods: {
    async getUserPosts(){
      this.userposts = await this.postss.filter(post=>{
        return post.user == this.useremail;
      })
    },
    loadMorePosts() {
      this.loadmorepost = true;
      this.limit += 4;
    },
    foldPosts(){
      this.limit = 4;
    }
  },
  watch:{
    posts: function(){
      this.postss = this.posts
      this.getUserPosts();
    },
    useremail: function(){
      this.portfolioss = this.portfolios;
      this.getUserPosts();
    },
    foldPosts(){
      this.limit = 4;
    }
  }
};
</script>
<style>
* {
  z-index: 99;
}
</style>
