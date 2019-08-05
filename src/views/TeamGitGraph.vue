<template>
  <v-layout align-center justify-center row fill-height style="background-color:#fafafa;">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div>
    <SolarSystemLoading v-show="this.$store.state.isLoading" class="v-fade"></SolarSystemLoading>
    <TeamGraph style="z-index:99" v-show="!this.$store.state.isLoading" class="v-fade"></TeamGraph>
  </v-layout>
</template>

<script>
import TeamGraph from '../components/repository/TeamGraph'
import SolarSystemLoading from '../components/template/solarSystemLoading'

export default {
	name: 'TeamGitGraph',
	components: {
    TeamGraph,
    SolarSystemLoading,
  },
  beforeCreate(){
    this.$store.state.isLoading = true
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
