<template>
  <div id="open-modal">
    <v-layout row wrap justify-center align-center style="text-align: center;">
      <div class="pink lighten-5" style="display:inline-block;border-radius:50%;width:32px;">
          <v-img :src="$store.state.weather.icon"/>
      </div>
      <div>
        &nbsp;{{$store.state.weather.temp}}
      </div>
    </v-layout>
    <WeatherDetail id="wether-modal"></WeatherDetail>
  </div>
</template>

<!-- <template>
  <div>
    <v-tooltip top>
      <template v-slot:activator = "{on}">
        <div v-on="on">
          <v-avatar color="pink lighten-5" size="32">
            <v-img :src="$store.state.weather.icon"/>
          </v-avatar>
          &nbsp;
          <span>{{$store.state.weather.temp}}</span>
        </div>
      </template>
      <WeatherDetail></WeatherDetail>
    </v-tooltip>
  </div>
</template> -->
<style>
#open-modal{
  overflow: hidden;
}
#open-modal:hover #wether-modal{
  display: block;
}
#wether-modal{
  display: none;
  position: fixed;
  width: 250px;
  height: 200px;
  bottom: 100px;
  right: 30px;
  z-index: 999;
  background-color: rgba(255,255,255,0.9);
  color:black
}
</style>
<script>
import axios from 'axios'
import WeatherDetail from '@/components/hyunah/WeatherDetail'

const API = 'https://api.openweathermap.org/data/2.5/weather?'
const KEY = 'fb745519f6b8d9130558572774f3ee74'

export default {
	name: 'weather',
  components : {
    WeatherDetail
  },
  data() {
    return {

    }
  },
  mounted() {
    if(this.$store.state.weather.icon == '') {
      this.geolocation()
    }
  },
  methods : {
    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.$store.state.weather.temp = Math.round((response.data.main.temp - 273.15)*10)/10 + "˚C";
          this.$store.state.weather.tempMin = Math.round((response.data.main.temp_min - 273.15)*10)/10 + "˚C";
          this.$store.state.weather.tempMax = Math.round((response.data.main.temp_max - 273.15)*10)/10 + "˚C";
          this.$store.state.weather.desc = response.data.weather[0].description;
          this.$store.state.weather.icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
          this.$store.state.weather.hum = response.data.main.humidity + "%";

        })
        .catch(error => {
          console.log(error);
        });
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = API + "lat=" + lat + "&lon=" + lon + "&appid=" + KEY;

      this.getWeather(url);
    }
  }
}
</script>
