<style>
.goog-te-banner-frame {
  top: 8.5%;
  width: 85%;
}
</style>

<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down"><v-btn flat><div id="google_translate_element" style="position : absoulte"></div></v-btn></v-toolbar-items>
    <div>HYUNAH &copy; {{ new Date().getFullYear() }}</div>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <weather/>
    <v-spacer></v-spacer>
  </v-footer>
</template>

<script>
import Weather from './hyunah/Weather.vue'

export default {
	name: 'main-footer',
  components : {
    'weather' : Weather
  }

}
</script>
