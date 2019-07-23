<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white px-4 pb-4>

    <!-- 로그아웃 -->
    <v-flex xs12 text-xs-center v-if="$store.state.user" my-3>
      <Logout></Logout>
    </v-flex>

    <!-- SNS 로그인 -->
    <SnsLogin v-if="!$store.state.user"></SnsLogin>

    <!-- 이메일 로그인 -->
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <UserLogin></UserLogin>
    </v-flex>

    <!-- 비밀번호 찾기 -->
    <v-flex mt-1 xs4 offset-xs7 text-xs-center v-if="!$store.state.user">
      <FindLost></FindLost>
    </v-flex>
    <v-flex xs12 pt-3 pb-3 v-if="!$store.state.user">
      <hr style="height:0.8px; border:none; color:#D3D3D3; background-color:#D3D3D3; ">
    </v-flex>

    <!-- 회원가입 -->
    <v-flex xs12 text-xs-center v-if="!$store.state.user">
      <Register></Register>
    </v-flex>

    <!-- 익명로그인 -->
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
import LoginService from "@/services/wook/LoginService";
import firebase from "firebase";
import UserLogin from "@/components/wook/UserLogin";
import Register from "@/components/wook/Register";
import FindLost from "@/components/wook/FindLost";
import Logout from "@/components/haewon/Logout";
import SnsLogin from "@/components/haewon/SnsLogin";

export default {
  name: "Login",
  components: {
    Register,
    UserLogin,
    FindLost,
    Logout,
    SnsLogin,
  },
  methods: {
    async loginAnno() {
      const result = await LoginService.loginAnno();
      this.$store.state.user = result.user;
      this.$store.state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      this.$store.commit('pushWebLog','anonymous')
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
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
