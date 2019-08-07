<template>
  <v-layout align-center justify-center row style="min-height:100vh!important;position:relative;">
    <div :class="{'shooting-star':this.$store.state.isLoading,'shooting-star-2':!this.$store.state.isLoading}">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="p p-1 v-fade"></div>
      <div class="p2 p-2 v-fade"></div>
      <div class="p3 p-3 v-fade"></div>
       <TeamGraph style="z-index:99;position: relative;" v-show="!this.$store.state.isLoading" class="v-fade" :class="{'hide':this.$store.state.isLoading}"></TeamGraph>
    </div>
    <SolarSystemLoading v-show="this.$store.state.isLoading" :class="{'hide':!this.$store.state.isLoading}" class="v-fade" ></SolarSystemLoading>
  </v-layout>
</template>

<script>
import TeamGraph from '../components/repository/TeamGraph'
import SolarSystemLoading from '../components/template/SolarSystemLoading'

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
.height-100vh{
  min-height:100vh!important;
}
.shooting-star{
  position: absolute;
  width:100%;
  height:100%;
  overflow:hidden;
}
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
