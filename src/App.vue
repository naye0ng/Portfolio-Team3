<template>
  <v-app>
    <v-content style="background-color:#ffffff;">
      <main-header/>
      <router-view/>
      <go-to-top/>
      <chatbot/>
      <main-footer/>
    </v-content>
  </v-app>
</template>

<script>
import store from './vuex/store'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import GoToTop from './components/template/GoToTop.vue'
import ChatBot from './components/template/ChatBot.vue'

export default {
	name: 'App',
  components : {
    'main-header' : Header,
    'main-footer' : Footer,
    'go-to-top' : GoToTop,
    'chatbot' : ChatBot
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
