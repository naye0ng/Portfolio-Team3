<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
    <v-flex xs12 text-xs-center v-if="$store.state.user">
      <v-btn round color="#000000" dark v-on:click="logout" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-sign-out</v-icon>로그아웃
      </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-google</v-icon>Google 로그인
      </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-btn round color="#3C5A99" dark v-on:click="loginWithFacebook" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 로그인
      </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-btn round color="#4078c0" dark v-on:click="loginWithGithub" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-github</v-icon>Github 로그인
      </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-btn round color="#F8F9F9" v-on:click="loginAnno" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-user</v-icon>익명 로그인
      </v-btn>
    </v-flex>
    <Register v-model="dialog" v-if="!$store.state.user"></Register>

    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-btn round color="#F8F9F9" v-on:click="loginUser" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-user</v-icon>회원 로그인
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Firebase from "firebase";
import UserLogin from "@/components/wook/UserLogin"
import Register from "@/components/wook/Register"

export default {
  name: "SnsLogin",
  data() {
    return {
      user: "",
      dialog2:false,
      dialog:false
    }
  },
  components: {
    Register,
    UserLogin
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.user = result.user;
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.user = result.user;
    },
    async loginWithGithub() {
      const result = await FirebaseService.loginWithGithub();
      this.$store.state.user = result.user;
    },
    async logout() {
      const result = await FirebaseService.logout();
      this.$store.state.user = null;
    },
    async loginUser() {
      const result = await FirebaseService.loginUser();
      this.$store.state.user = result.user;
    },
    async loginAnno() {
      const result = await FirebaseService.loginAnno();
      this.$store.state.user = result.user;
      this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
    }
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.$store.state.user = user;
      if (this.$store.state.user && this.$store.state.user.isAnonymous) {
        this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
      console.log(this.$store.state.user);
    });
  }
};
</script>
