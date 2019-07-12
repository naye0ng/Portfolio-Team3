<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
    <v-flex xs12 text-xs-center v-if="user">
      <v-btn round color="#000000" dark v-on:click="logout" style="width:50%;"><v-icon size="25" class="mr-2">fa-sign-out</v-icon> 로그아웃 </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:50%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#3C5A99" dark v-on:click="loginWithFacebook" style="width:50%;"><v-icon size="25" class="mr-2">fa-facebook</v-icon> Facebook 로그인</v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#4078c0" dark v-on:click="loginWithGithub" style="width:50%;"><v-icon size="25" class="mr-2">fa-github</v-icon> Github 로그인</v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#F8F9F9" v-on:click="loginAnno" style="width:50%;"><v-icon size="25" class="mr-2">fa-user</v-icon> 익명 로그인</v-btn>
    </v-flex>
    <Register v-model="dialog" v-if="!user"></Register>
  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import Firebase from "firebase";

import Register from "@/components/wook/Register"

export default {
  name: 'SnsLogin',
	data() {
		return {
      user: "",
      dialog:false
    }
  },
  components: {
    Register
  },
  methods: {
		async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle()
      this.user = FirebaseService.curUser()
      console.log(this.user)
    },
    async loginWithFacebook(){
      const result = await FirebaseService.loginWithFacebook()
      this.user = FirebaseService.curUser()
    },
    async loginWithGithub(){
      const result = await FirebaseService.loginWithGithub()
      this.user = FirebaseService.curUser()
    },
    async logout(){
      const result = await FirebaseService.logout()
      this.user= await FirebaseService.curUser()
    },
    async loginAnno(){
      const result = await FirebaseService.loginAnno()
      this.user = await FirebaseService.curUser()
    }
  },
	mounted() {
    Firebase.auth().onAuthStateChanged(user=>{
      this.user = user;
    })
  },
  watch:{
    user: function(val){
      this.$loginBus.$emit('loggedIn',this.user)
    }
  }
}
</script>
