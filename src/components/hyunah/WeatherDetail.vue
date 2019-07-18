<template>
  <v-container fluid grid-list-md>
     <v-layout row wrap>
       <v-flex d-flex xs12 order-xs5>
         <v-layout column>
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
         <v-layout column>
           <v-flex d-flex>
             <span style="font-size:16pt">{{$store.state.weather.temp}}</span>
           </v-flex>
           <v-flex d-flex>
             <span>Max : {{$store.state.weather.tempMax}}</span>
           </v-flex>
           <v-flex d-flex>
             <span>Min : {{$store.state.weather.tempMin}}</span>
           </v-flex>
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
