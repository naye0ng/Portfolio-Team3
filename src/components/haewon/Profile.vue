<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 align-center justify-center layout text-xs-center>
      <!-- User photo -->
      <v-avatar size="150" id="photophoto">
        <v-img :src="photoURL" aspect-ratio="1" width="150px" height="150px"></v-img>
      </v-avatar>
    </v-flex>

    <!-- User Info -->
    <v-flex xs12 justify-center text-xs-center id="profiledetail">
      <div class="mt-4">
        <h1 style="color:#f7f7f7; font-size:1.7em;">{{name}}</h1>
        <span style="color:#f7f7f7; font-size:1.3em;">{{email}}</span>
        <br />
        <span style="color:grey; font-size:1.1em;">{{telephone}}</span>
        <br />
        <div class="mt-4 mb-4" style="color:#f7f7f7;">
          <span style="color:#f7f7f7; font-size:1.2em;">즐거운 인생</span>
          <br />
          <span style="color:#f7f7f7; font-size:1.2em;">어제도 개발 오늘도 개발</span>
        </div>

        <!-- Sns 계정 연동하기-->
        <v-layout align-center justify-center col mt-3 v-if="!linked" wrap>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 연동
            </v-btn>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-google</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 연동
            </v-btn>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-facebook</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#4078c0" outline v-on:click="linkwithSNS(3)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-github</v-icon>Github 연동
            </v-btn>
            <v-btn color="#181818" outline v-on:click="linkwithSNS(3)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-github</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import SnsService from "@/services/haewon/SnsService";
import firebase from "firebase";

export default {
  name: "Profile",
  data() {
    return {
      photoURL: "",
      email: "",
      telephone: "",
      name: "",
      findPass: "",
      answer: "",
      isAno: "",
      isemail: false,
      dialog: false,
      curU: "",
      linked : false,
    };
  },
  methods: {
    back(user) {
      this.email = user.email;
      this.telephone = user.telephone;
      this.name = user.name;
      this.findPass = user.findPass;
      this.answer = user.answer;
    },
    async linkwithSNS(num) {
      var res = await SnsService.LinkSNS(num);
      this.$store.dispatch("checkUserStatus");
      this.dialog = false;
      if (res){
        this.linked = true;
      }
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => { // 유저 확인하고
      this.curU = user;
      if (user && !user.isAnonymous) { 
        if (user.providerData.length>1){
          this.linked = user.providerData[1].providerId == "password";
          this.isemail = user.providerData[1].providerId == "password";
        }
        else{
          if (user.providerData[0].providerId == "password"){
            this.isemail = true;
            this.linked = false;
          }
          else{
            this.isemail = false;
            this.linked = true;
          }
        }
      }
      if (user && user.isAnonymous){
        this.isemail = false;
        this.linked = true;
      }
      // User가 이메일로 로그인 했을 때
      if (this.isemail && this.curU){
        const user = {
          email: "",
          telephone: "",
          name: "",
          findPass: "",
          answer: ""
        };
        var query = firebase
          .database()
          .ref("user")
          .orderByKey();
        query.once("value").then(snapshot => {
          var curEmail = firebase.auth().currentUser.email;
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if (curEmail === childData.email) {
              user.email = childData.email;
              user.telephone = childData.telephone;
              user.name = childData.name;
              user.findPass = childData.findPass;
              user.answer = childData.answer;
            }
          });
        this.back(user);
        this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        });
      }
      // 유저가 SNS로 로그인 했을 때
      else if (this.curU){
        this.isAno = this.curU.isAnonymous;
        if (!this.isAno) {
          this.photoURL = this.curU.photoURL;
          this.name = this.curU.displayName;
          this.email = this.curU.email;
        }
        else {
          this.name = "Guest";
          this.email = "guest@ssafy.com";
          this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
        if (!this.photoURL){
          this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
      }
    });
  }
};
</script>
<style>
#photophoto,
#profiledetail {
  z-index: 99;
}
</style>
