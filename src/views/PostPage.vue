<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">Post</div>
    </ImgBanner>
    <v-container>
      
      <!-- Post Writer -->
      <v-flex xs12 text-xs-center>
        <v-btn color="info" router :to="{
          name: 'makecontents',
          params: {
            kind: 'post',
          }}" exact>
          <v-icon size="25" class="mr-2">border_color</v-icon> 포스트 작성
        </v-btn>
      </v-flex>

      <!-- Post List -->
      <v-layout>
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
