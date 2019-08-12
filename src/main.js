import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import Carousel3d from 'vue-carousel-3d'

import App from './App.vue'
import router from './router'
import store from './vuex/store'
import VeeValidate from 'vee-validate' // add
import './registerServiceWorker'

import './stylus/main.styl'

Vue.config.productionTip = false

Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#EC407A',
		secondary: '#181818',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(VueSimplemde)
Vue.use(VeeValidate)

Vue.use(VueSweetalert2)
Vue.use(Carousel3d)

Vue.prototype.$loginBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
