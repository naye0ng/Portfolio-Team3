<template>
  <div class="banner">
    <div class="stars">
      <div class="twinkling">
        <div class="p p-1"></div>
        <div class="p2 p-2"></div>
        <div class="p3 p-3"></div>
      </div>
    </div>
    <v-layout align-center justify-center row fill-height style="position:absolute; width:100%">
      <v-flex v-show="!this.$store.state.isLoading" class="v-fade text-xs-center">
        <span class="text-shadow font-weight-light" style="width: 100%;">
          <slot name="text"/>
        </span>
      </v-flex>
      <SolarSystemLoading v-show="this.$store.state.isLoading" class="v-fade"></SolarSystemLoading> 
    </v-layout>
  </div>
</template>
<script>
import SolarSystemLoading from './solarSystemLoading'

export default {
	name: 'ImgBanner',
	props: {
		imgSrc: {type: String},
		text: {type: String}
  },
  components:{
     SolarSystemLoading
  },
}
</script>
<style>
  .text-shadow {
    font-family: 'Do Hyeon', sans-serif;
    text-shadow: 0.1em 0px #EC407A;
    line-height:1.2em;
    letter-spacing: 0.05em;
    font-size:5vw;
    color:#ffffff;
    z-index: 3;
  }
  .banner{
    position: relative;
    width:100%;
    height: 100vh;
  }
  .twinkling{
    z-index:1;
    position:absolute;
  }
</style>
