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
            <v-flex xs4 mt-5>
              <v-btn color="secondary" router :to="{
                name: 'makecontents',
                params: {
                  kind: 'post'
                }}" exact dark width="100%">
                <v-icon size="25" class="mr-2">border_color</v-icon>
                <span class="hidden-sm-and-down">포스트 작성</span>
              </v-btn>
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
  }
}
</script>
