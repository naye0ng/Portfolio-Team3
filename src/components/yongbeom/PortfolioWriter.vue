<template>
  <v-layout row justify-center>
      <v-card>
        <v-card-title>
          <span class="headline">Portfolio Writer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- image preview -->
              <v-flex xs12>
                <img :src="imageUrl" height="150" v-if="imageUrl" />
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onLocalImagePicked">
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn color="primary" @click="useLocalFile" v-model="imageName">Use Local Image</v-btn>
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
                          사진 업로드
                        </v-card-title>
                        <v-card-text>
                          <v-text-field label="Add Img By URL" v-model="selectUrl" required @change="useUrlImg"></v-text-field>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="dialog = false">올리기!</v-btn>
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
  name : 'PortfolioWriter',
  components : {
    VueEditor,
  },
  data() {
    return {
      text : '',
      title : '',
      username : '',
      imageName : '',
      imageUrl : '',
      imageFile : '',
      selectUrl : '',
      storageUrl : '',
      dialog: false
    };
  },
  mounted() {
  },
  methods : {
    //Save Portfolio
    save : function(event) {
      //Blank check
      if(this.text == '' || this.title == '' || this.imageUrl == '') {
        
        var alertMsg = '';
        if(this.imageUrl == '') {
          alertMsg = '이미지는 필수항목입니다. 이미지를 선택해주세요.'
        } else if(this.title == '') {
          alertMsg = '제목은 필수항목입니다. 제목을 입력해주세요.'
        } else if(this.text == '') {
          alertMsg = '내용은 필수항목입니다. 내용을 입력해주세요';
        }
        
        this.$swal({
            type: 'error',
            title: 'Oops...',
            text: alertMsg
        });
      }

      else {
        //Call Firebase service
        FirebaseService.postPortfolio(this.title, this.text, this.imageUrl)
        this.dialog = false

        //Reinitialize data
        this.imageName = ''
        this.imageUrl = ''
        this.imageFile = ''
        this.text = ''
        this.title = ''

        //Popup
        this.$swal({
          type : 'success',
          title : 'Great!',
          html : '저장되었습니다!</br>더 작성하시겠습니까?',
          showCancelButton : true,
          showConfirmButton : true,
        }).then((result) => {
          if(result.value) {
            // if clink ok
          }
          else {
            this.goPortfolio();
          }
        })
      }
    },

    clear : function(event) {
      this.text = ''
      this.title = ''
    },
    clearimg(){
      this.imageUrl = ''
    },
    useUrlImg(){
      this.imageUrl = this.selectUrl
      this.selectUrl = ''
      this.dialog = false;
      this.onUrlImagePicked(this.imageUrl)
    },
    useRandomImg(){
      this.imageUrl = 'https://source.unsplash.com/random/800x600'
      this.onImageUrlPicked(this.imageUrl)
    },
    useLocalFile() {
      this.$refs.image.click()
    },
    onLocalImagePicked(e) {
      console.log("select section")
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
      console.log("name : " + this.imageName)
        /* if(this.imageName.lastIndexOf('.') <= 0) {
          return
        } */
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
          console.log("url : " + this.imageUrl)
          console.log("file : " + this.imageFile)
          console.log(this.imageUrl.name)
        }) 
      } else {
        this.imageName=''
        this.imageFile=''
        this.imageUrl=''
      }
    },
    onImageUrlPicked(url) {
      const image2base64 = require('image-to-base64');
      image2base64(url)
        .then(
          (response) => {
              this.imageUrl = 'data:image/jpeg;base64,' + response
              console.log("i264 : " +this.imageUrl)
            }
        )
    },
    goPortfolio() {
      this.$router.push('/portfolio');
    }
  }
};
</script>
