<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <button
          class="button button--wayra button--border-medium button--text-medium button--size-s"
          style="color:#fff"
          v-on="on"
        >프로필 수정</button>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text style="padding-bottom:0px;">
          <v-container grid-list-md style="padding-top: 0; padding-bottom:0;">
            <v-layout wrap>
              <!-- 유저 이미지 변경 -->
              <v-flex xs12>
                <div style="text-align:center;">
                    <img :src="image" height="200" v-if="image"/>
                  <input type="file" style="display:none" ref="image" accept="image/*" @change="onLocalImagePicked">
                </div>
              </v-flex>
              <v-flex xs3 text-xs-center pl-0 class="bg-1">
                <button @click="useLocalFile" class="button button--wayra button--border-thin button--text-medium button--size-xs"
                  style="min-width:90%; max-width:90%;padding:0.3em 0.5em;margin:0;">
                    Local Image
                </button>
              </v-flex>

              <v-flex xs3>
                <template>
                  <div class="text-xs-center bg-1">
                    <v-dialog v-model="dialog2" width="500">
                      <template v-slot:activator="{ on }">
                        <button v-on="on" class="button button--wayra button--border-thin button--text-medium button--size-xs"
                          style="min-width:90%; max-width:90%;padding:0.3em 0.5em;margin:0;">
                            Url Image
                        </button>
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
                          <v-btn color="primary" flat @click="dialog2 = false">올리기!</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template>
              </v-flex>
              <v-flex xs3 text-xs-center class="bg-1">
                <button @click="useRandomImg" class="button button--wayra button--border-thin button--text-medium button--size-xs"
                  style="min-width:90%; max-width:90%;padding:0.3em 0.5em;margin:0;">
                    Random Image
                </button>
              </v-flex>
              <v-flex xs3 text-xs-center class="bg-1">
                <button @click="clearimg" class="button button--wayra button--border-thin button--text-medium button--size-xs"
                  style="min-width:90%; max-width:90%;padding:0.3em 0.5em;margin:0;">
                    Delete Image
                </button>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Name" v-model="name" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="NickName" v-model="datanick" :placeholder="nickname"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Telephone" v-model="datatel" :placeholder="telephone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Biography" v-model="databio" :placeholder="biography"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card-actions style="padding-top:0;">
                  <span class="body-1">당신은 <strong>{{showLevel}}</strong> 입니다.</span>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat v-if="accessLevel == 0" @click="upgradeAL">upgrade!</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat text @click="dialog = false">Close</v-btn>
          <v-btn color="primary" flat text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase"
import Swal from 'sweetalert2'
import FirebaseService from '@/services/FirebaseService'

export default {
  name : "modifyProfile",
  props: {
    emailKey : { type : String },
    name : { type : String },
    email : { type : String },
    telephone : { type : String },
    biography : { type : String },
    accessLevel : { type : String },
    nickname : { type : String },
  },
  data: () => ({
    dialog: false,
    databio : "",
    datatel : "",
    datanick : "",
    dialog2: false,
    selectUrl:"",
    imageName:"",
    imageFile:"",
    image:"",
  }),
  mounted(){
    if (this.$store.getters.dbuser.photoURL){
      // console.log(this.$store.getters.dbuser.photoURL);
      this.image = this.$store.getters.dbuser.photoURL;
    }
    console.log("test : " + FirebaseService.profilePhotoUploader("test.gmail.com", "data:image/jpeg;base64,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"))
  },
  methods : {
    save() {
      this.dialog = false;

      var ref = firebase.database().ref("user").child(this.emailKey);

      if(this.datatel != "" && this.datatel != this.$store.getters.dbuser.telephone) {
        ref.child('telephone').set(this.datatel).then(data => {
          this.$store.commit("setDBUserTel", this.datatel);
        })
      }
      if(this.databio != "" && this.databio != this.$store.getters.dbuser.biography) {
        ref.child('biography').set(this.databio).then(data => {
          this.$store.commit("setDBUserBio", this.databio);
        })
      }
      if(this.datanick != "" && this.datanick != this.$store.getters.dbuser.nickname) {
        ref.child('nickname').set(this.datanick).then(data => {
          this.$store.commit("setDBUserNick", this.datanick);
        })
      }
      
      if (this.image && this.image != this.$store.getters.dbuser.photoURL){
        FirebaseService.profilePhotoUploader(this.email, this.emailKey, this.image)
        this.$store.commit("setDBPhotoURL", this.image);
      }
    },
    upgradeAL() {
      var upgradeL = this.accessLevel == "0" ? "1" : "2"
      firebase
        .database()
        .ref("upgrade")
        .child(this.emailKey)
        .child("accessLevel")
        .set(upgradeL)
        .then(data => {
          Swal.fire({
            text: "등업 요청을 완료하였습니다. 곧 처리해드리겠습니다.",
            title: "Success!",
            type: 'success'
          })
        })
    },
    clearimg(){ // DeleteImageBtn
      this.image = ''
    },
    useUrlImg(){ // UseUrlImageBtn
      this.image = this.selectUrl
      this.selectUrl = ''
      this.dialog2 = false;
      this.onUrlImagePicked(this.image)
    },
    useRandomImg(){ // RandomImgBtn
      this.image = 'https://source.unsplash.com/random/100x100'
      this.onUrlImagePicked(this.image)
    },
    useLocalFile() { // UseLocalImageBtn
      this.$refs.image.click()
    },
    onLocalImagePicked(e) { // Transform Local Image to base64 type data url
      console.log("select section")
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        // console.log("name : " + this.imageName)
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.image = fr.result
          this.imageFile = files[0]
          // console.log("url : " + this.image)
          // console.log("file : " + this.imageFile)
          // console.log(this.image.name)
        })
      } else {
        this.imageName=''
        this.imageFile=''
        this.image=''
      }
    },
    onUrlImagePicked(url) { // Transform Url Image to base64 type data url
      const image2base64 = require('image-to-base64');
      image2base64(url)
        .then(
          (response) => {
              this.image = 'data:image/jpeg;base64,' + response
              // console.log("i264 : " +this.image)
            }
        )
    },
  },
  computed : {
    showLevel() {
      return this.accessLevel == "0" ? '방문자' : this.accessLevel == "1" ? '팀원' : '어드민';
    },
    profile_image(){
      return this.$store.getters.dbuser.photoURL;
    }
  },
  watch:{
    profile_image(){
      this.image = this.profile_image;
    }
  }
}
</script>
