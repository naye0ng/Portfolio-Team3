<template>
  <div>
    <ImgBanner>
      <div slot="text">Post</div>
    </ImgBanner>
    <v-container>

      <!-- Post Writer -->
      <v-layout justify-center class="mb-2">
        <v-flex xs11>
          <v-layout wrap align-center justify-end>
<<<<<<< HEAD
            <v-flex xs4 mt-5 mr-4 class="bg-1">
              <!-- <v-btn color="secondary" router :to="{
                name: 'makecontents',
                params: {
                  kind: 'post'
                }}" exact dark width="100%">
                <v-icon size="25" class="mr-2">border_color</v-icon>
                <span class="hidden-sm-and-down">포스트 작성</span>
              </v-btn> -->
              <router-link :to="{
                name: 'makecontents',
                params: {
                  kind: 'Post'
                }}">
                <button
                  class="button button--wayra button--border-medium button--text-medium button--size-s"
                  style="max-width: 150px;padding:0.5em 1em;">
                  포스트 작성
                </button>
              </router-link>
=======
            <!-- Write button -->
            <v-flex xs4 mt-5>
              <v-btn color="#0F9D58" @click="checkuesr" dark width="100%" class="hidden-sm-and-down">
                <v-icon size="25" class="mr-2">border_color</v-icon> 포스트 작성
              </v-btn>
              <v-btn color="#0F9D58" @click="checkuesr" dark width="100%" class="hidden-md-and-up">
                <v-icon size="25" class="mr-2">border_color</v-icon>
              </v-btn>
>>>>>>> userinpost
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Post List -->
      <v-layout class="mt-5">
        <v-flex xs12>
          <PostList :limits="4" :load-more="true"></PostList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PostList from '../components/PostList'

export default {
	name: 'PostPage',
	components: {
		ImgBanner,
		PostList,
  },
  methods : {
    checkuesr(){
      if(!this.$store.state.user) {
        this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'need to login'
        });
      }
      else{
        this.$router.push({ name: 'makecontents', params: { kind: 'post' }})
      }
    }
  }
}
</script>
