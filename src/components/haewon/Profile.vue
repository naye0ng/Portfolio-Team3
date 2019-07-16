<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 align-center justify-center layout text-xs-center>
      <v-avatar size="150">
        <v-img :src="photoURL" aspect-ratio="1" width="150px" height="150px"></v-img>
      </v-avatar>
    </v-flex>
    <v-flex xs12 justify-center text-xs-center mb-5>
      <div class="mt-4">
        <h1>{{name}}</h1>
        <span class="grey--text">{{email}}</span>
        <br />
        <div class="mt-4">
          <h3>즐거운 인생</h3>
          <h3>어제도 개발 오늘도 개발</h3>
        </div>
        <v-btn class="mt-3" round color="#8E5DF6" dark to="/team3">Team 3</v-btn>
        <div v-if="isemail">
          <v-btn class="mt-3" round color="#3EAF0E" dark @click="dialog = true">SNS 계정과 연동하기</v-btn>
        </div>
      </div>
    </v-flex>
    <v-layout row justify-center>
      <v-flex xs1>
        <a href="https://facebook.com" style="text-decoration:none;">
          <v-avatar size="60" color="#3b5998">
            <v-icon color="#F8F8F8">fa-facebook</v-icon>
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs1>
        <a href="https://google.com" style="text-decoration:none;">
          <v-avatar size="60" color="#DB4437">
            <v-icon color="#F8F8F8">fa-google</v-icon>
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs1>
        <a href="https://github.com" style="text-decoration:none;">
          <v-avatar size="60" color="#4078c0">
            <v-icon color="#F8F8F8">fa-github</v-icon>
          </v-avatar>
        </a>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="400">
      <v-card style="border-radius:20px;">
        <v-flex class="text-xs-right">
          <v-btn small icon @click="dialog = false" style="margin-bottom:0px">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
        <v-card-title
          style="padding-top:0px;"
          class="headline justify-center"
        >소셜 계정과 연동하기</v-card-title>
        <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
          <v-flex xs12 text-xs-center>
            <v-btn round color="#df4a31" dark v-on:click="linkwithSNS(1)" style="width:50%;">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 로그인
            </v-btn>
          </v-flex>
          <v-flex xs12 text-xs-center>
            <v-btn round color="#3C5A99" dark v-on:click="linkwithSNS(2)" style="width:50%;">
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 로그인
            </v-btn>
          </v-flex>
          <v-flex xs12 text-xs-center>
            <v-btn round color="#4078c0" dark v-on:click="linkwithSNS(3)" style="width:50%;">
              <v-icon size="25" class="mr-2">fa-github</v-icon>Github 로그인
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase";

export default {
  name: "SnsLogin",
  data() {
    return {
      photoURL: "",
      email: "",
      telephone: "",
      name: "",
      findPass:"",
      answer:"",
      phoneNumber: "",
      displayName: "",
      isAno: "",
      isemail: false,
      dialog: false
    }   
  },
  methods : {
    back(user){
      this.email=user.email;
      this.telephone=user.telephone;
      this.name=user.name;
      this.findPass=user.findPass;
      this.answer=this.answer;
    } 
  },
  mounted() {
    const user = {
      email: "",
      telephone: "",
      name: "",
      findPass:"",
      answer:""
    };
    var query=firebase.database().ref("user").orderByKey();
    query.once("value")
      .then((snapshot) => {
        var curEmail=firebase.auth().currentUser.email;
        snapshot.forEach(function(childSnapshot) { 
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          if(curEmail===childData.email){
            user.email=childData.email;
            user.telephone=childData.telephone;
            user.name=childData.name;
            user.findPass=childData.findPass;
            user.answer=childData.answer;
            console.log(user);
          }
      });
    this.back(user);
    });
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user && !user.isAnonymous){
        this.isemail = this.user.providerData[0].providerId == "password";
      }
    })
  }),
  watch: {
    user: function(val) {
      if (this.user) {
        this.isAno = this.user.isAnonymous;
      }
      if (this.user && !this.isAno) {
        this.displayName = this.user.displayName;
        this.email = this.user.email;
        this.photoURL = this.user.photoURL;
        if (!this.photoURL) {
          this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
      }
      if (this.user && this.isAno) {
        this.displayName = "Unknown";
        this.email = "unknown@ssafy.com";
        this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
    }
  },
  methods: {
    async linkwithSNS(num) {
      var res = await FirebaseService.LinkSNS(num);
      this.dialog = false;
    }
  }
};
</script>