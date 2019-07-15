<template>
  <div>
    <v-tooltip bottom transition="slide-y-transition" width="100%">
     <template v-slot:activator = "{on}">
       <div v-on="on" >
         <span>🚀 오늘의 방문자 : {{ visited }}명 </span>
       </div>
     </template>
     <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex style="font-size:18px;text-align:center;padding-bottom:10px;">금주의 방문 👻</v-flex>
          <v-flex d-flex xs12 order-xs5>
            <v-layout column>
              <v-flex v-for="(num, date) in visitedWeek" d-flex style="font-size:13px;">
                <span style="width:80%;text-align:left">{{ date }}</span>
                <span style="width:20%; text-align:right">{{ num }}명</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
 </v-tooltip>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Visited",
  data() {
    return {
      visited: 0,
      visitedWeek: {},
      dates: []
    }
  },
  methods: {
    getVisited(){
      var date_time = new Date()
      var start = new Date()
      start.setDate(date_time.getDate()-4)
      this.dates = []
      while (start <= date_time) {
        this.dates.push(start.toDateString())
        start.setDate(start.getDate() + 1);
      }
      firebase.database().ref().child("logs").on('value', (snapshot)=>{
        var todayV = snapshot.val()
        this.visited = Object.keys(todayV[this.dates[4]]).length
        this.visitedWeek = {}

        this.dates.forEach(date=>{
          this.visitedWeek[date] = todayV.hasOwnProperty(date) ? Object.keys(todayV[date]).length : 0
        })

      });

    }
  },
  mounted() {
      this.getVisited()
  }
};
</script>
