<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator = "{on}">
        <div v-on="on">
          <v-avatar color="pink lighten-5" size="32">
            <v-img :src="icon"/>
          </v-avatar>
          &nbsp;
          <span>{{temp}}</span>
        </div>
      </template>
        <v-container fluid grid-list-md>
           <v-layout row wrap>
             <v-flex d-flex xs12 order-xs5>
               <v-layout column>
                 <v-flex d-flex>
                   <span style="font-size:16pt">{{desc}}</span>
                 </v-flex>
                 <v-flex d-flex>
                   <span>Humidity : {{hum}}</span>
                 </v-flex>
               </v-layout>
             </v-flex>
             <v-flex d-flex xs6 sm6>
               <v-layout row wrap>
                 <v-flex d-flex>
                   <v-img :src="icon"/>
                 </v-flex>
               </v-layout>
             </v-flex>
             <v-flex d-flex xs6 sm6>
               <v-layout column>
                 <v-flex d-flex>
                   <span style="font-size:16pt">{{temp}}</span>
                 </v-flex>
                 <v-flex d-flex>
                   <span>Max : {{tempMax}}</span>
                 </v-flex>
                 <v-flex d-flex>
                   <span>Min : {{tempMin}}</span>
                 </v-flex>
               </v-layout>
             </v-flex>
           </v-layout>
         </v-container>
    </v-tooltip>
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
          this.hum = response.data.main.humidity + "%";

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
