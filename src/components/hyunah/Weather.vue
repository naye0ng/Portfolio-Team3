<template>
  <div>

  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService'

export default {
	name: 'weather',
  data() {
    return {
      weather : { t : 1 }
    }
  },
  mounted() {
   this.getLocation()
   this.getWeather()
  },
  methods : {
    async getLocation() {
      await WeatherService.getLocation();
    },

    async getWeather() {
      this.weather = await WeatherService.getWeather();
      console.log(this.weather);
    }
  }
}
</script>
