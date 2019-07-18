<template >
  <v-container fluid grid-list-md>
     <v-layout row wrap>
       <v-flex d-flex xs12 order-xs5>
         <v-layout column style="line-height:1.5rem;">
           <v-flex d-flex>
             <span style="font-size:16pt">{{$store.state.weather.desc}}</span>
           </v-flex>
           <v-flex d-flex>
             <span>Humidity : {{$store.state.weather.hum}}</span>
           </v-flex>
         </v-layout>
       </v-flex>
       <v-flex d-flex xs6 sm6>
         <v-layout row wrap>
           <v-flex d-flex>
             <v-img :src="$store.state.weather.icon"/>
           </v-flex>
         </v-layout>
       </v-flex>
       <v-flex d-flex xs6 sm6>
         <v-layout column align-center justify-center class="p-wrap">
             <p style="font-size:1.3rem;padding-bottom:3px;">{{$store.state.weather.temp}}</p>
             <p style="font-size:1rem;">Max : {{$store.state.weather.tempMax}}</p>
             <p style="font-size:1rem;">Min : {{$store.state.weather.tempMin}}</p>
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
