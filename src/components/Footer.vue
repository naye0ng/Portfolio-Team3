<style>
.goog-te-banner-frame {
  top: 8.5%;
  width: 85%;
}
</style>

<template>
  <v-footer height="auto">
    <v-layout justify-center align-center row wrap>
      <v-flex xs4 py-3 class="footer-el text-xs-center">
        <div id="google_translate_element" style="position : absoulte"></div>
      </v-flex>
      <v-flex xs4 py-3 class="footer-el text-xs-center">
        &copy;2019 — <strong>SSSAFY Team3</strong>
      </v-flex>
      <v-flex xs4 py-3 class="footer-el text-xs-center" style="line-height: 2.5rem;">
        <weather/>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import Weather from './hyunah/Weather.vue'
import Visited from './nayeong/Visited.vue'
import firebase from 'firebase'

export default {
	name: 'main-footer',
  components : {
    'weather' : Weather,
    Visited
  },
}
</script>
