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
  beforeMount() {
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if(isChrome == false) {
      this.$swal({
          type: 'error',
          title: 'Oops...',
          text: '해당 사이트는 크롬에 최적화되어있습니다. 정상적으로 작동하지 않을 수 있습니다.'
      });
    }
  }
}
</script>
