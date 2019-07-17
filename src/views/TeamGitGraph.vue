<template>
  <v-layout align-center justify-center row fill-height style="background-color:#fafafa;">
	  <TeamGraph></TeamGraph>
  </v-layout>
</template>

<script>
import TeamGraph from '../components/nayeong/TeamGraph'

export default {
	name: 'TeamGitGraph',
	components: {
		TeamGraph,
	}
}
</script>
