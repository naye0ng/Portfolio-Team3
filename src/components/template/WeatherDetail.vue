<!-- 날씨 디테일을 보여주는 부분 tooltip, detail 창으로 쓰임 -->
<template >
  <v-container fluid grid-list-md>
     <v-layout row wrap>
       <v-flex d-flex xs12 order-xs5>
         <v-layout column style="line-height:1.5rem;">
           <v-flex d-flex>
             <span style="font-size:16pt">{{$store.getters.weather.desc}}</span>
           </v-flex>
           <v-flex d-flex>
             <span>Humidity : {{$store.getters.weather.hum}}</span>
           </v-flex>
         </v-layout>
       </v-flex>
       <v-flex d-flex xs6 sm6>
         <v-layout row wrap>
           <v-flex d-flex>
             <v-img :src="$store.getters.weather.icon"/>
           </v-flex>
         </v-layout>
       </v-flex>
       <v-flex d-flex xs6 sm6>
          <v-layout column align-center justify-center class="p-wrap">
            <p style="font-size:1.3rem;padding-bottom:3px;">{{$store.getters.weather.temp}}</p>
            <p style="font-size:1rem;">Max : {{$store.getters.weather.tempMax}}</p>
            <p style="font-size:1rem;">Min : {{$store.getters.weather.tempMin}}</p>
          </v-layout>
       </v-flex>
     </v-layout>
   </v-container>
</template>

<script>

export default {
  name : 'weatherdetail',
}

</script>
<style>
.p-wrap p{
  margin: 2px 0;
  line-height:1.5rem;
}
</style>
