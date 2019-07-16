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
        <v-btn class="mt-3" round color="#8E5DF6" dark>Team 3</v-btn>
      </div>
    </v-flex>
    <v-layout row justify-center>
      <v-flex xs1>
        <a href="https://facebook.com" style="text-decoration:none;">
          <v-avatar size="80" color="#3b5998">
            <v-icon color="#F8F8F8">fa-facebook</v-icon>
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs1>
        <a href="https://google.com" style="text-decoration:none;">
          <v-avatar size="80" color="#DB4437">
            <v-icon color="#F8F8F8">fa-google</v-icon>
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs1>
        <a href="https://github.com" style="text-decoration:none;">
          <v-avatar size="80" color="#4078c0">
            <v-icon color="#F8F8F8">fa-github</v-icon>
          </v-avatar>
        </a>
      </v-flex>
    </v-layout>
    <!-- <v-card v-if="!isAno" max-height="500px" max-width="300px">
      <v-img :src="photoURL" aspect-ratio="1" width="300px" height="300px"></v-img>
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{displayName}}</h3>
      </v-card-title>
      <v-card-text>
        <div class="text-xs-left">{{email}}</div>
      </v-card-text>
    </v-card>
    <v-card v-if="isAno" width="300px">
      <v-card-title primary-title class="justify-center">
        <h3>익명 회원 공간</h3>
      </v-card-title>
    </v-card>-->
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
      isAno: "",
      findPass:"",
      answer:""
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
    console.log("this : "+this);
  },
  watch: {
    user: function(val) {
      if (this.user) {
        this.isAno = this.user.isAnonymous;
      }
      if (this.user && !this.isAno) {
        var user = firebase.auth().currentUser;
        console.log(user);
        if (!this.photoURL){
          this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
      }
      if (this.user && this.isAno) {
        this.displayName = "Unknown";
        this.email = "unknown@ssafy.com";
        this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
    }
  }
};
</script>