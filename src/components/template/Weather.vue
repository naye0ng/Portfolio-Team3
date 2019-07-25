<!-- Footer에 배치되는 부분 -->
<template>
  <div id="open-modal">
    <v-layout row wrap justify-center align-center style="text-align: center;">
      <div class="pink lighten-5" style="display:inline-block;border-radius:50%;width:32px;">
          <v-img :src="$store.getters.weather.icon"/>
      </div>
      <div>
        &nbsp;{{$store.getters.weather.temp}}
      </div>
    </v-layout>
    <WeatherDetail id="weather-modal"></WeatherDetail>
  </div>
</template>

<style>
#open-modal{
  overflow: hidden;
}
#open-modal:hover #weather-modal{
  display: block;
}
#weather-modal{
  display: none;
  position: fixed;
  width: 250px;
  height: 200px;
  bottom: 9vh;
  right: 9vw;
  z-index: 999;
  background-color: rgba(255,255,255,0.9);
  color:black
}
</style>
<script>
import WeatherDetail from '@/components/template/WeatherDetail'

export default {
	name: 'weather',
  components : {
    WeatherDetail
  },
  data() {
    return {
    }
  }
}
</script>
