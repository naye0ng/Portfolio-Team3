<template>
  <v-app>
      <v-content>
        <main-header v-if="isNotRoot()"/>
        <router-view/>
        <UtilityButtons  v-if="isNotRoot()"/>
        <main-footer v-if="isNotRoot()"/>
      </v-content>
  </v-app>
</template>
<script>
import store from './vuex/store'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import UtilityButtons from './components/template/UtilityButtons.vue'

export default {
	name: 'App',
  components : {
    'main-header' : Header,
    'main-footer' : Footer,
    UtilityButtons,
  },
	store,
	data() {
		return {
			//
		}
  },
  methods: {
    isNotRoot() {
      return this.$route.path === '/' ? false : true
    },
    browserChecking(){
      var agent = window.navigator.userAgent;
      //var isIE = agent.indexOf('Trident');
      //var isEdge = agent.indexOf('Edge');
      var isChrome = agent.indexOf('Chrome');
      var isChromeMobile = agent.indexOf('CriOS');
      if(isChrome>-1||isChromeMobile>-1){
      }
      else{
        this.$swal({
          type: "error",
          title: "Oops...",
          text:
          "해당 사이트는 크롬에 최적화되어있습니다. 정상적으로 작동하지 않을 수 있습니다."
        });
      }
    },
  },
  created() {
    // App이 생성될 때, init에 필요한 부분.
    // 날씨 정보를 받아와 vuex에 저장.
    this.$store.dispatch('initWeather');
    this.browserChecking()
  },
}
</script>
<style>
.v-fade {
  display: inherit !important; /* override v-show display: none */
  transition: opacity 1s;
}
.v-fade[style*="display: none;"] {
  z-index:0;
  opacity: 0;
  pointer-events: none; /* disable user interaction */
  user-select: none; /* disable user selection */
}
.hide {
  display: none !important;
}
</style>
