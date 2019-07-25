<template>
    <v-container py-0>
      <v-layout column>
        <v-flex xs12>
          <v-card color="secondary" flat>
            <v-card-title>
              <span>🚀 오늘의 방문자 : <strong>{{ visited }}</strong>명 🚀</span>
            </v-card-title>
            <v-card-text>
              <canvas id="visitedChart" width="100%" height="50%"></canvas>
            </v-card-text>
          </v-card>
        </v-flex>
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
          labels: this.dates,
          datasets : [
            {
              data: cnt,
              backgroundColor: 'rgb(236, 64, 122, 0.8)',
              borderColor: 'rgb(255,255,255,0.4)'
            }
          ]
        },
        options : {
          legend : {
            display: false
          },
          scales:{
            xAxes: [{
              display: false, //this will remove all the x-axis grid lines
              gridLines: {
                display:false
              }
            }],
            yAxes: [{
              display: false,
              gridLines: {
                display:false
              }
            }]
          },
          layout : {
            padding: 5
          },
          tooltips : {
            backgroundColor : 'rgb(255,255,255)',
            titleFontColor: 'rgb(0,0,0)',
            bodyFontColor: 'rgb(0,0,0)'
          }
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
