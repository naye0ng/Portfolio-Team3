<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10 text-xs-center>
      <Profile></Profile>
    </v-flex>
  </v-layout>
</template>

<script>

import Profile from '../components/haewon/Profile'

export default {
	name: 'ProfilePage',
	data() {
		return {}
	},
	components: {
    Profile
  },
	methods: {
	},
	mounted() {
	}
}
</script>
