<template>
  <v-container color="grey lighten-3">
    <v-layout column>
    <v-tooltip bottom transition="slide-y-transition" width="100%">
     <template v-slot:activator = "{on}">
       <div v-on="on" >
         <span>🚀 오늘의 방문자 : {{ visited }}명 </span>
         <canvas id="visitedChart" width="100%" height="50%"></canvas>
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
</v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
import chart from "chart.js";

export default {
  name: "Visited",
  data() {
    return {
      visited: 0,
      visitedWeek: {},
      dates: [],
      count: []
    }
  },
  computed : {
    getCount() {
      return this.count;
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

        var cnt = [];
        this.dates.forEach((date, index)=>{
          this.visitedWeek[date] = todayV.hasOwnProperty(date) ? Object.keys(todayV[date]).length : 0
          cnt[index] = todayV.hasOwnProperty(date) ? Object.keys(todayV[date]).length : 0
        })
        this.setCount(cnt)
      });

    },
    setCount(cnt) {
      var ctx = document.getElementById("visitedChart");
      var visitedChart = new chart.Chart(ctx, {
        type:"line",
        data : {
          labels : this.dates,
          datasets : [
            {
              label: "금주의 방문 👻",
              data: cnt,
            }
          ]
        }
      });
      this.count = cnt;
    }
  },
  mounted() {
      this.getVisited()
  }
};
</script>
