<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 align-center justify-center layout text-xs-center>
      <v-avatar size="150">
        <v-img :src="photoURL" aspect-ratio="1" width="150px" height="150px"></v-img>
      </v-avatar>
    </v-flex>
    <v-flex xs12 justify-center text-xs-center>
      <div class="mt-4">
        <h1>{{displayName}}</h1>
        <span class="grey--text">{{email}}</span>
        <br />
        <div class="mt-4">
          <h3>즐거운 인생</h3>
          <h3>어제도 개발 오늘도 개발</h3>
        </div>
        <!-- <v-btn class="mt-3" round color="#8E5DF6" dark to="/team3">Team 3</v-btn> -->
        <v-layout align-center justify-center col mt-3 v-if="isemail" wrap>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:100%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 연동
            </v-btn>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-google</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:100%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 연동
            </v-btn>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-facebook</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#181818" outline v-on:click="linkwithSNS(3)" style="width:100%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-github</v-icon>Github 연동
            </v-btn>
            <v-btn color="#181818" outline v-on:click="linkwithSNS(3)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-github</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
    <!-- <v-layout row justify-center>
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
    </v-layout>-->
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Firebase from "firebase";

export default {
  name: "SnsLogin",
  data() {
    return {
      user: "",
      photoURL: "",
      email: "",
      phoneNumber: "",
      displayName: "",
      isAno: "",
      isemail: false
    };
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user && !user.isAnonymous) {
        this.isemail = this.user.providerData[0].providerId == "password";
      }
      // console.log(this.user);
    });
  },
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