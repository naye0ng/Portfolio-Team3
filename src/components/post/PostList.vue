<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="i in posts.length > pageLimit ? pageLimit : posts.length" :class="'xs' + 12 / column" px-3 v-if="!message">
      <!-- Give post infomation to each Post.vue -->
      <Post
        :email="posts[i - 1].user"
        :date="posts[i - 1].created_at"
        :title="posts[i - 1].title"
        :body="posts[i - 1].body"
        :id="posts[i - 1].id"
        :tag="posts[i-1].tag"
        >
      </Post>
    </v-flex>
    <v-flex xs12 v-if="message" class="mt-4">
      <div><h1 style="text-align:center;">검색 결과 없음...</h1></div>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore" class="bg-1">
      <button v-on:click="loadMorePosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
        더 보기
      </button>
    </v-flex>
  </v-layout>
</template>
<script>
import Post from "@/components/post/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    limits: { type: Number, default: 4 },
    loadMore: { type: Boolean, default: false },
    search: {type:String, default:''},
  },
  data() {
    return {
      posts: [],
      pageLimit : this.limits,
      message: false
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    // Get All Posts infomation from firestore database
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.loadMore = true;
      this.pageLimit += 4;
    }
  },
  watch: {
    search : async function(newVal,oldVal){
      if (!newVal){
        this.posts = await FirebaseService.getPosts()
        this.message = false;
      }
      else{
        FirebaseService.getTag(newVal).then(curTag=>{
          if (curTag){
            var postlist = curTag.postlist;
            var templist = []
            postlist.forEach(async post => {
              templist.push(await FirebaseService.getPost(post));
            })
            this.message=false;
            this.posts = templist;
          }
          else{
            this.message = true;
            this.posts = [];
          }
        });
      }
    }
  }
  
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
