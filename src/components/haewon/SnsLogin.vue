<template>
  <v-layout align-center justify-center row wrap elevation-5 style="height:100%;" white pa-4>
    <v-flex xs12 text-xs-center v-if="user">
      <v-btn round color="#000000" dark v-on:click="logout" style="width:70%;"><v-icon size="25" class="mr-2">fa-google</v-icon> 로그아웃 </v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:70%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#3C5A99" dark v-on:click="loginWithFacebook" style="width:70%;"><v-icon size="25" class="mr-2">fa-facebook</v-icon> Facebook 로그인</v-btn>
    </v-flex>
    <v-flex xs12 text-xs-center v-if="!user">
      <v-btn round color="#4078c0" dark v-on:click="loginWithGithub" style="width:70%;"><v-icon size="25" class="mr-2">fa-github</v-icon> Github 로그인</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'SnsLogin',
	data() {
		return {
      user : ""
    }
	},
  methods: {
		async loginWithGoogle() {
			const result = await FirebaseService.loginWithGoogle()
			this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
      this.user=FirebaseService.curUser()
      console.log(this.user)
    },
    async loginWithFacebook(){
      const result = await FirebaseService.loginWithFacebook()
      this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
      this.user = FirebaseService.curUser()
      console.log(this.user)
    },
    async loginWithGithub(){
      const result = await FirebaseService.loginWithGithub()
      this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
      this.user = FirebaseService.curUser()
      console.log(this.user)
      console.log(this.$store.state.user)
    },
    async logout(){
      const result = await FirebaseService.logout()
      this.user= await FirebaseService.curUser()
      console.log(this.user)
      console.log(this.$store.state.user)
    }
	},
	mounted() {
    this.user= FirebaseService.curUser()
	}
}
</script>
