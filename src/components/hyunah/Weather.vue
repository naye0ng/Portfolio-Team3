<template>
  <div>

  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService'

export default {
	name: 'weather',
  props : {
      loc : {}
  },
  mounted() {
   this.getLocation()
  },
  methods : {
    async getLocation() {
      this.loc = await WeatherService.getLocation();
      console.log("...")
      console.log(this.loc)
    }
  }
}
</script>
