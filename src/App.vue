<template>
  <v-app>
    <v-content style="background-color:#ffffff;">
      <main-header/>
      <router-view/>
      <go-to-top/>
      <main-footer/>
    </v-content>
  </v-app>
</template>

<script>
import store from './vuex/store'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import GoToTop from './components/GoToTop.vue'

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
  created() {
    // App이 생성될 때, init에 필요한 부분.

    // 날씨 정보를 받아와 vuex에 저장.
    this.$store.dispatch('initWeather');
  }
}
</script>
