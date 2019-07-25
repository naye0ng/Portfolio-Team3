<style>

</style>


<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs5 text-xs-center>
      <v-layout align-center justify-center row fill-height elevation-5 style="min-height:500px;" white pa-4>
        <v-flex xs6 text-xs-center>
          <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:100%;"><v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인</v-btn>
        </v-flex>
		<Register></Register>
		<FindLost></FindLost>
      </v-layout>

      <SnsLogin></SnsLogin>

    </v-flex>

  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import Register from '../components/login/Register'
import FindLost from '../components/login/FindLost'
import SnsLogin from '../components/login/SnsLogin'


export default {
	name: 'LoginPage',
	components: {
		Register,
		FindLost,
		SnsLogin
	},
	methods: {
		async loginWithGoogle() {
			const result = await FirebaseService.loginWithGoogle()
			this.$store.state.accessToken = result.credential.accessToken
			this.$store.state.user = result.user
		},
		openModal() {
			var btn=document.getElementById("myBtn");
		}
	},
	mounted() {
	}
}
</script>
