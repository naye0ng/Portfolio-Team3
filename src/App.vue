<template>
  <v-app>
      <v-content>
        <main-header v-if="isNotRoot()"/>
        <router-view/>
        <go-to-top  v-if="isNotRoot()"/>
        <main-footer v-if="isNotRoot()"/>
      </v-content>
  </v-app>
</template>
<script>
import store from './vuex/store'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import GoToTop from './components/template/GoToTop.vue'

export default {
	name: 'App',
  components : {
    'main-header' : Header,
    'main-footer' : Footer,
    'go-to-top' : GoToTop,
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
  /* z-index:9999; */
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
