<template>
  <v-layout align-center justify-center row fill-height style="background-color:#fafafa;">
	  	<div class="stars"></div>
    	<div class="twinkling"></div>
	  	<TeamGraph style="z-index:99"></TeamGraph>
  </v-layout> 
</template>

<script>
import TeamGraph from '../components/repository/TeamGraph'

export default {
	name: 'TeamGitGraph',
	components: {
		TeamGraph,
	}
}
</script>
<style>
.twinkling{
  z-index:1;
  position:absolute;
}
</style>
