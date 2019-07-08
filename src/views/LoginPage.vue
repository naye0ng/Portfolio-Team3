<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs5 text-xs-center>
      <SnsLogin></SnsLogin>
    </v-flex>
  </v-layout>
</template>

<script>

import SnsLogin from '../components/haewon/SnsLogin'

export default {
	name: 'LoginPage',
	data() {
		return {}
	},
	components: {
    SnsLogin
  },
	methods: {
	},
	mounted() {
	}
}
</script>
