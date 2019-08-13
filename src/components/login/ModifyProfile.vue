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
      this.image = 'https://source.unsplash.com/random/200x200'
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
