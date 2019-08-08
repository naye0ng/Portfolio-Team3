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
    <v-flex xs12 text-xs-center round v-if="loadMore && posts" class="bg-1">
      <v-flex xs12 text-xs-center round my-4 v-if="loadMore && pageLimit<posts.length" class="bg-1">
        <button v-on:click="loadMorePosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
          더 보기
        </button>
      </v-flex>
      <v-flex xs12 text-xs-center round my-4 v-if="loadMore && posts &&  posts.length>4 && pageLimit>=posts.length" class="bg-1">
        <button v-on:click="foldPosts" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
          접기
        </button>
      </v-flex>
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
      allposts:[],
      tags:[],
      pageLimit : this.limits,
      message: false
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
    this.getTags();
  },
  methods: {
    // Get All Posts infomation from firestore database
    async getPosts() {
      this.allposts= await FirebaseService.getPosts();
      this.posts = this.allposts;
    },
    async getTags(){
      this.tags = await FirebaseService.getTags();
      this.$store.state.isLoading = false
    },
    loadMorePosts() {
      this.loadMore = true;
      this.pageLimit += 4;
    },
    foldPosts(){
      this.pageLimit = 4;
    },
    async asyncForEach(array, callback){
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
  },
  watch: {
    search : async function(newVal,oldVal){
      if (!newVal){
        // this.posts = await FirebaseService.getPosts()
        this.posts = this.allposts;
        this.message = false;
      }
      else{
        var FilterTag = await this.tags.filter(tag=>{
          return tag.id.includes(newVal)
        })
        if (FilterTag){
          var temppost = [];
          await this.asyncForEach(FilterTag, async (tagg) => {
            temppost = temppost.concat(tagg.postlist);
          });
          temppost = [...new Set(temppost)];
          var templist = []
          await this.asyncForEach(temppost, async (post) => {
            templist.push(await FirebaseService.getPost(post));
          })
          this.message = false;
          this.posts = templist;
        }
        else{
          this.message = true;
          this.posts = [];
        }
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
