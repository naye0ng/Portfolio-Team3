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
      <v-flex xs6 sm4 py-3 class="footer-el text-xs-center footer-el-mob-hid">
        <div id="google_translate_element"></div>
      </v-flex>
      <v-flex xs6 py-3 class="footer-el text-xs-center hidden-sm-and-up footer-el-mob-hid" style="line-height: 2.5rem; color:#fff;">
        <weather/>
      </v-flex>
      <v-flex xs12 sm4 py-3 class="footer-el text-xs-center " style="color:#fff;" align-self-center>
        <v-layout justify-center align-center row wrap>
          <v-flex xs5 class="text-xs-right"> &copy;2019&nbsp;—&nbsp;</v-flex>
          <v-flex xs6 style="float:left;" class="text-xs-left">
            <img
            @click="openWindow('https://lab.ssafy.com/naye0ng/webmobile-sub2')"
            src="../../assets/logodark.png" style="height:2.5rem; cursor:pointer;">
            <img>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm4 py-3 class="footer-el text-xs-center hidden-xs-only" style="line-height: 2.5rem; color:#fff;">
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

<style>
@media(max-width:450px) {
  .footer-el-mob-hid {
    display: none;
  }
}
</style>
