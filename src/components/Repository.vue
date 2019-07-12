<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs12 sm6>
        <a :href="repos.http_url" class="repo-btn">
          <h2 class="font-weight-regular headline">{{repos.path_name}}</h2>
          <p class="subheading mb-1 grey--text text--darken-1 font-weight-light">{{repos.username}}</p>
        </a>
      </v-flex>        
      <v-flex hidden-xs-only sm6>
        <canvas :id="repos.username" width="100%" height="50%"></canvas>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import chart from "chart.js";
import axios from "axios";

export default {
	name: 'Repository',
	props: {
		repos: {type: null}
	},
	data() {
		return {
			stats: {}
		}
  },
  methods: {
    async getCommits() {
      var response = await axios.get("https://api.github.com/repos/"+this.$props.repos.path_name+"/commits?per_page=100");
      return response.data;
    },
    createMemberGraph(data){
      let end = new Date(data[0].commit.author.date.slice(0, 10));
      let start = new Date(
        data[data.length - 1].commit.author.date.slice(0, 10)
      );
      let labels = [];
      let commits = [];
      let k = data.length-1
      while (start <= end) {
        labels.push(start.getMonth() + 1 + "월 " + start.getDate() + "일"); 
        commits.push(0);
        while(k>=0){
          var dt = new Date(data[k].commit.author.date.slice(0, 10))
          if(dt-start==0){
            commits[commits.length-1] += 1
            k -= 1
          }else{
            break
          }
        }
        start.setDate(start.getDate() + 1);
      }
      var ctx = document.getElementById(this.$props.repos.username);
      var teamChart = new chart.Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "# commits",
              data: commits,
              backgroundColor: this.$props.repos.color[0],
              borderColor:this.$props.repos.color[1],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    },
  },
  mounted() {
    var commits = this.getCommits();
    commits.then(data => {
      this.createMemberGraph(data);
    });
  }
}
</script>

<style>
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.subheading {
  max-height: 6.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.repo-btn:link,.repo-btn:visited,.repo-btn:active{
  color:black;
  text-decoration: none;
}
.repo-btn:hover{
  color:rgb(192, 50, 73);
}
</style>
