<template>
  <div>
    <img :src="icon"/>
  </div>
</template>

<script>
import axios from 'axios'

const API = 'https://api.openweathermap.org/data/2.5/weather?'
const KEY = 'fb745519f6b8d9130558572774f3ee74'

export default {
	name: 'weather',
  data() {
    return {
      temp : '',
      tempMin : '',
      tempMax : '',
      icon : '',
      desc : '',
      hum : ''
    }
  },
  beforeMount() {
   this.geolocation()
   console.log(this.icon)
  },
  methods : {
    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.temp = Math.round((response.data.main.temp - 273.15)*10)/10 + "˚C";
          this.tempMin = Math.round((response.data.main.temp_min - 273.15)*10)/10 + "˚C";
          this.tempMax = Math.round((response.data.main.temp_max - 273.15)*10)/10 + "˚C";
          this.desc = response.data.weather[0].description;
          this.icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
          this.humidity = response.data.main.humidity + "%";
          console.log(this.temp);
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
      console.log(url);

      this.getWeather(url);
    }
  }
}
</script>
