<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white px-4 pb-4>
    <v-flex xs12 text-xs-center v-if="$store.state.user" my-5>
      <v-btn color="primary" dark v-on:click="logout" style="width:80%;">
        <v-icon size="25" class="mr-2">fa-sign-out</v-icon>로그아웃
      </v-btn>
    </v-flex>
    <v-layout align-center justify-center row wrap white v-if="!$store.state.user">
      <v-flex xs3 text-xs-center class="mx-1">
        <v-avatar size="65" v-on:click="loginWithGoogle" color="#df4a31" style="cursor:pointer;">
          <v-icon size="25" dark >fa-google</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs3 text-xs-center class="mx-1">
        <v-avatar size="65" v-on:click="loginWithFacebook" color="#3C5A99" style="cursor:pointer;">
          <v-icon size="25" dark >fa-facebook</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs3 text-xs-center class="mx-1">
        <v-avatar size="65" v-on:click="loginWithGithub" color="#4078c0" style="cursor:pointer;">
          <v-icon size="25" dark >fa-github</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs12 pt-4 mt-1 pb-3>
        <hr style="height:0.9px; border:none; color:#D3D3D3; background-color:#D3D3D3; ">
      </v-flex>
    </v-layout>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <UserLogin></UserLogin>
    </v-flex>
    <v-flex mt-1 xs4 offset-xs7 text-xs-center v-if="!$store.state.user">
    <FindLost></FindLost>
    </v-flex>
    <v-flex xs12 pt-3 pb-3 v-if="!$store.state.user">
      <hr style="height:0.8px; border:none; color:#D3D3D3; background-color:#D3D3D3; ">
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <Register></Register>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <v-layout row justify-center>
        <v-btn color="#7A7A7A" dark v-on:click="loginAnno" style="width:80%;">
          <v-icon size="25" class="mr-2">fa-question-circle</v-icon>익명 로그인
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Firebase from "firebase";
import UserLogin from "@/components/wook/UserLogin";
import Register from "@/components/wook/Register";
import FindLost from "@/components/wook/FindLost";

export default {
  name: "SnsLogin",
  data() {
    return {
      user: "",
      dialog2: false,
      dialog: false,
      snsdialog: false
    };
  },
  components: {
    Register,
    UserLogin,
    FindLost
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.user = result.user;
      this.$store.commit('pushWebLog','google')
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.user = result.user;
      this.$store.commit('pushWebLog','facebook')
    },
    async loginWithGithub() {
      const result = await FirebaseService.loginWithGithub();
      this.$store.state.user = result.user;
      this.$store.commit('pushWebLog','github')
    },
    async logout() {
      const result = await FirebaseService.logout();
      this.$store.state.user = null;
    },
    async loginAnno() {
      const result = await FirebaseService.loginAnno();
      this.$store.state.user = result.user;
      this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      this.$store.commit('pushWebLog','anonymous')
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.$store.state.user = user;
      if (this.$store.state.user && this.$store.state.user.isAnonymous) {
        this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
      if (this.$store.state.user && !this.$store.state.user.photoURL) {
        this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
    });
  }
};
</script>
