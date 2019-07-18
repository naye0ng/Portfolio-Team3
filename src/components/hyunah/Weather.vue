<template>
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
</template>

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
      console.log('dddd')
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
