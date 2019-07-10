<style>

</style>


<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs5 text-xs-center>
<<<<<<< HEAD
      <v-layout align-center justify-center row fill-height elevation-5 style="min-height:500px;" white pa-4>
        <v-flex xs6 text-xs-center>
          <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
        </v-flex>
		<Register></Register>
		<FindLost></FindLost>
      </v-layout>
=======
      <SnsLogin></SnsLogin>
>>>>>>> e2df30278e5443a57909a0b7e06f043338ec267c
    </v-flex>

  </v-layout>
</template>

<script>
<<<<<<< HEAD
import FirebaseService from '@/services/FirebaseService'
import Register from '../components/wook/Register'
import FindLost from '../components/wook/FindLost'
=======

import SnsLogin from '../components/haewon/SnsLogin'
>>>>>>> e2df30278e5443a57909a0b7e06f043338ec267c

export default {
	name: 'LoginPage',
	components: {
		Register,
		FindLost
	},
<<<<<<< HEAD
	methods: {
		async loginWithGoogle() {
			const result = await FirebaseService.loginWithGoogle()
			this.$store.state.accessToken = result.credential.accessToken
			this.$store.state.user = result.user
		},
		openModal() {
			var btn=document.getElementById("myBtn");
		}
=======
	components: {
    SnsLogin
  },
	methods: {
>>>>>>> e2df30278e5443a57909a0b7e06f043338ec267c
	},
	mounted() {
	}
}
</script>
