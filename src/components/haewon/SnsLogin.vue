<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
    <v-flex xs12 text-xs-center v-if="$store.state.user">
      <v-btn round color="#000000" dark v-on:click="logout" style="width:50%;">
        <v-icon size="25" class="mr-2">fa-sign-out</v-icon>로그아웃
      </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <UserLogin></UserLogin>
    </v-flex>
    <v-flex xs4 text-xs-center v-if="!$store.state.user">
    <FindLost></FindLost>
    </v-flex>
    <v-flex xs12 pt-3 pb-3>
      <hr>
    </v-flex>
    <v-flex xs4 text-xs-center v-if="!$store.state.user">
      <Register></Register>
    </v-flex>
    <v-flex xs4 text-xs-center v-if="!$store.state.user" style="margin-left:-6px; margin-right:2px;">
      <v-btn color="#df4a31" dark @click="snsdialog = true" style="width:100%;">
        <v-icon size="25" class="mr-2">fa-google-plus-square</v-icon>SNS 로그인
      </v-btn>
    </v-flex>
    <v-flex xs4 text-xs-center v-if="!$store.state.user">
      <v-btn color="#7A7A7A" dark v-on:click="loginAnno" style="width:100%;">
        <v-icon size="25" class="mr-2">fa-question-circle</v-icon>익명 로그인
      </v-btn>
    </v-flex>
    <v-dialog v-model="snsdialog" max-width="400">
      <v-card style="border-radius:20px;">
        <v-flex class="text-xs-right">
          <v-btn small icon @click="snsdialog = false" style="margin-bottom:0px">
            <v-icon>close</v-icon>
          </v-btn>
        </v-flex>
        <v-card-title style="padding-top:0px;" class="headline justify-center">SNS 로그인</v-card-title>
        <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
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
        </v-layout>
      </v-card>
    </v-dialog>
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
