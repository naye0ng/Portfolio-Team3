<template>
  <v-layout align-center justify-center row fill-height style="background-color:#fafafa;">
	  	<div class="stars"></div>
    	<div class="twinkling"></div>
		<div class="p p-1"></div>
		<div class="p2 p-2"></div>
		<div class="p3 p-3"></div>
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
