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
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onImagePicked">
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn color="primary" @click="pickFile" v-model="imageName">Use Local Image</v-btn>
              </v-flex>

              <v-flex xs2>
                <template>
                  <div class="text-xs-center">
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Use Url Image</v-btn>
                      </template>
                      <v-card>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title
                        >
                          Privacy Policy
                        </v-card-title>
                        <v-card-text>
                          <v-text-field label="Add Img By URL" v-model="selectUrl" required @change="setImg"></v-text-field>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template>
              </v-flex>

              <v-flex xs2>
                <v-btn color="primary" @click="useRandomImg" v-model="imageName">Random Image</v-btn>
              </v-flex>
              <v-flex xs2>
                <v-btn color="primary" @click="useBannerImg" v-model="imageName">Use Banner Image</v-btn>
              </v-flex>
              <v-flex xs2>
                <v-btn color="error" @click="clearimg" v-model="imageName">Delete Image</v-btn>
              </v-flex>
              <v-flex xs2>
              </v-flex>
              <v-flex xs12>
                <template>
                  <div id="app">
                    <vue-editor v-model="text"></vue-editor>
                  </div>
                </template>
              </v-flex>
            </v-layout>
          </v-container>
<!--           <small>*indicates required field</small>-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
          <v-btn color="blue darken-1" flat to="/portfolio">Back</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
import { VueEditor } from "vue2-editor";
import FirebaseService from '@/services/FirebaseService'

export default {
  name : 'portfolio-writer',
  components : {
    VueEditor,
  },
  data() {
    return {
      text : '',
      title : '',
      imageName : '',
      imageUrl : '',
      imageFile : '',
      selectUrl : '',
      dialog: false
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
    clearimg(){
      this.imageUrl = ''
    },
    setImg(){
      this.imageUrl = this.selectUrl
      this.selectUrl = ''
      this.dialog = false;
    },
    useRandomImg(){
      this.imageUrl = ''
      this.imageUrl = 'https://source.unsplash.com/random/1280x720'
    },
    useBannerImg(){
      this.imageUrl = 'https://source.unsplash.com/random/1600x900'
    },
    pickFile() {
      this.$refs.image.click()
    },
    onImagePicked(e) {
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
