<template>

  <v-layout align-center justify-center row wrap white>
    <!-- google 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithGoogle" color="#df4a31" style="cursor:pointer;">
        <v-icon size="25" dark>fa-google</v-icon>
      </v-avatar>
    </v-flex>
    <!-- facebook 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithFacebook" color="#3C5A99" style="cursor:pointer;">
        <v-icon size="25" dark>fa-facebook</v-icon>
      </v-avatar>
    </v-flex>
    <!-- github 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithGithub" color="#4078c0" style="cursor:pointer;">
        <v-icon size="25" dark>fa-github</v-icon>
      </v-avatar>
    </v-flex>
    <v-flex xs12 pt-4 mt-1 pb-3>
      <hr style="height:0.9px; border:none; color:#D3D3D3; background-color:#D3D3D3; " />
    </v-flex>
  </v-layout>
</template>

<script>
import Firebase from "firebase";
import SnsService from "@/services/haewon/SnsService";

export default {
  name: "SnsLogin",
  components:{
      SnsService,
  },
  methods: {
    async loginWithGoogle() {
      const result = await SnsService.loginWithGoogle();
      if (result){
        this.$store.commit("pushWebLog", "google");
      }
    },
    async loginWithFacebook() {
      const result = await SnsService.loginWithFacebook();
      if (result){
        this.$store.commit("pushWebLog", "facebook");
      }
    },
    async loginWithGithub() {
      const result = await SnsService.loginWithGithub();
      if (result){
        this.$store.commit("pushWebLog", "github");
      }
    }
  }
};
</script>
