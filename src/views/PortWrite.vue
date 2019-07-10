<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/5brvJbR1Pn8/1600x900">
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">Write Portfolio</div>
    </ImgBanner>
    <v-container>
      <v-layout>
        <v-flex xs12 md7 offset-md1>
          <v-form>
            <v-text-field
              v-model="title"
              label="Title"
              required>
            </v-text-field>
            
            <!-- call file uploader -->
            <file-uploaderv-on:downloadURL="getDownloadUrl" v-bind:oldImgUrl="oldImgUrl" class="mb-4"></file-uploaderv-on:downloadURL="getDownloadUrl">
          </v-form>
          
          <vue-editor
            id="writer"
            v-model="content"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
          ></vue-editor>
          
          <v-layout align-center justify-end row fill-height>
            <v-btn @click="savePost">save</v-btn>
          </v-layout>
        </v-flex>
        
        
        <!-- Markdown Editor -->
        <v-flex xs12>
          <Vueditor></Vueditor>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- Buttons -->
        <v-flex>
          <upload></upload>
        </v-flex>
        <v-flex xs6 text-xs-right round my-5>
          <v-btn color="blue-grey" text-xs-center dark to="/" ><v-icon size="25" class="mr-2">done</v-icon>작성완료</v-btn>
        </v-flex>
        <v-flex xs6 text-xs-left round my-5>
          <v-btn color="blue-grey darken-3" text-xs-center dark to="/portfolio" ><v-icon size="25" class="mr-2">undo</v-icon>돌아가기</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import upload from '../components/imguploader'


export default {
	name: 'PortWrite',
	components: {
		ImgBanner,
  }
}
</script>
