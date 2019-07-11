<template>
  <v-layout row justify-center>
      <v-card>
        <v-card-title>
          <span class="headline">Your Portfolio</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- image preview -->
              <v-flex xs12>
                <img :src="imageUrl" height="150" v-if="imageUrl" />
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-btn color="primary" @click="pickFile" v-model="imageName">Use Local Image</v-btn>
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onFilePicked">
              </v-flex>
              <v-flex xs4>
                <v-btn color="primary" @click="pickFile" v-model="imageName">Use URL Image</v-btn>
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onFilePicked">
              </v-flex>

              <v-flex xs4>
                <v-text-field label="Add Img By URL" v-model="imageUrl" required></v-text-field>
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onUrlPicked">
              </v-flex>
              <v-flex xs12>
                <Editor ref="editor" :nativeEmoji="true" :preview="true" v-model="text"/>
              </v-flex>
            </v-layout>
          </v-container>
<!--           <small>*indicates required field</small>
 -->        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
   
  </v-layout>
</template>

<script>
import {Editor} from 'vuetify-markdown-editor';
import FirebaseService from '@/services/FirebaseService'

export default {
  name : 'portfolio-writer',
  components : {
    Editor
  },
  data() {
    return {
      text : '',
      title : '',
      imageName : '',
      imageUrl : '',
      imageFile : '',
    };
  },
  mounted() {
    this.$refs.editor.focus();
  },
  methods : {

    save : function(event) {
      // FirebaseError: Missing or insufficient permissions.
      // 권한이 없으므로 주석처리함.
      FirebaseService.postPortfolio(this.title, this.text, this.imageUrl)
      this.dialog = false
      this.imageName = ''
      this.imageUrl = ''
      this.imageFile = ''
      this.text = ''
      this.title = ''
    },
    clear : function(event) {
      this.text = ''
      this.title = ''
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName=''
        this.imageFile=''
        this.imageUrl=''
      }
    },
    onUrlPicked(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.imageUrl = e.target.result;
      };
    }
  }
};
</script>
