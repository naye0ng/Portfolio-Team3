<template>
  <div class="banner">
    <div class="stars">
      <div class="twinkling">
      </div>
    </div>
    <v-layout align-center justify-center row fill-height style="position:absolute; width:100%">
      <v-flex text-xs-center>
        <span class="text-shadow font-weight-light">
          <slot name="text"/>
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>



<script>

export default {
	name: 'ImgBanner',
	props: {
		imgSrc: {type: String},
		text: {type: String}
	},
	methods: {
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
    /*
    border-bottom:3vh solid #EC407A;
    -moz-box-shadow: 2vh 2vh #181818;
    -webkit-box-shadow: 2vh 2vh #181818;
    box-shadow: 2vh 2vh #181818;
    */
  }
  .twinkling{
    z-index:1;
    position:absolute;
  }
</style>
