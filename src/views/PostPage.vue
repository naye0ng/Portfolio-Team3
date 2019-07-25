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
            <v-flex xs4 mt-4 mr-4 class="bg-1">
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
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Post List -->
      <v-layout class="mt-4">
        <v-flex xs12>
          <PostList :limits="4" :load-more="true"></PostList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/template/ImgBanner'
import PostList from '../components/post/PostList'

export default {
	name: 'PostPage',
	components: {
		ImgBanner,
		PostList,
  }
}
</script>
