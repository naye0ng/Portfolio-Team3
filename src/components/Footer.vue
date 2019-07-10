<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>HYUNAH &copy; {{ new Date().getFullYear() }}</div>
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
