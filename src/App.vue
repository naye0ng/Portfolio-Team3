<template>
  <v-app>
    <v-content>
      <main-header/>
      <router-view/>
      <go-to-top/>
      <main-footer/>
    </v-content>
  </v-app>
</template>

<script>
import store from './store'
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
}
</script>
