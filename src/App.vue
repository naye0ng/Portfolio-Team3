<template>
  <v-app>
    <HelloUniverse class="v-fade" v-show="this.$store.state.isHelloUniverse" :class="{'hide':!this.$store.state.isHelloUniverse, 'v-fade': true}"></HelloUniverse>
    <div v-show="!this.$store.state.isHelloUniverse">
      <v-content style="background-color:#ffffff;" v-show="!this.$store.state.isHelloUniverse" class="v-fade">
        <main-header/>
        <router-view/>
        <go-to-top/>
        <main-footer/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import store from './vuex/store'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import GoToTop from './components/template/GoToTop.vue'
import HelloUniverse from './components/template/HelloUniverse.vue'

export default {
	name: 'App',
  components : {
    'main-header' : Header,
    'main-footer' : Footer,
    'go-to-top' : GoToTop,
    HelloUniverse
  },
	store,
	data() {
		return {
			//
		}
  },
  created() {
    // App이 생성될 때, init에 필요한 부분.
    // 날씨 정보를 받아와 vuex에 저장.
    this.$store.dispatch('initWeather');
  }
}
</script>
<style>
.v-fade {
  display: inherit !important; /* override v-show display: none */
  transition: opacity 1s;
  z-index:9999;
}
.v-fade[style*="display: none;"] {
  opacity: 0;
  pointer-events: none; /* disable user interaction */
  user-select: none; /* disable user selection */
}
.hide {
  display: none !important;
}
</style>
