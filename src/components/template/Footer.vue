<style>
.goog-te-banner-frame {
  top: 8.5%;
  width: 85%;
}

.skiptranslate.goog-te-gadget {
  color:#f7f7f7;
  background-color:#181818;
}

.goog-te-combo {
  color:#f7f7f7;
  background-color:#181818;
}
</style>

<template>
  <v-footer height="auto" style="background-color:#181818;">
    <v-layout justify-center align-center row wrap>
      <v-flex xs4 py-3 class="footer-el text-xs-center">
        <div id="google_translate_element"></div>
      </v-flex>
      <v-flex xs4 py-3 class="footer-el text-xs-center " style="color:#fff;" align-self-center>
        <v-layout justify-center align-center row wrap>
          <v-flex xs2> &copy;2019 — </v-flex>
          <v-flex xs3>
            <img
            @click="openWindow('https://lab.ssafy.com/naye0ng/webmobile-sub2')"
            src="../../assets/logodark.png" style="height:2.5rem; cursor:pointer;">
            <img>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4 py-3 class="footer-el text-xs-center" style="line-height: 2.5rem; color:#fff;">
        <weather/>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import Weather from '@/components/template/Weather'
import Visited from '@/components/repository/Visited'
import firebase from 'firebase'

export default {
	name: 'main-footer',
  components : {
    'weather' : Weather,
    Visited
  },
  methods : {
    openWindow(url) {
      window.open(url);
    }
  }
}
</script>
