<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
  <div class="card-shadow">
    <a :href="repos.http_url" class="repo-btn">
    <v-card-text class="headline font-weight-bold" style="padding-top:30px;">
      <canvas :id="repos.username" width="100%" height="50%"></canvas>
    </v-card-text>
    <v-card-actions style="padding:0px;">
      <v-list-tile class="grow py-2" :style="{ 'background-color' : repos.color[0]}">
        <v-list-tile-avatar color="grey darken-3">
          <v-img class="elevation-6" :src="getImgUrl(repos.image)"></v-img>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{repos.username}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card-actions>
    </a>
  </div>
</template>

<script>
import chart from "chart.js";
import axios from "axios";

export default {
  name: "Repository",
  props: {
    repos: { type: null }
  },
  data() {
    return {
      stats: {}
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    async getCommits() {
      var response = await axios.get(
        "https://api.github.com/repos/" +
          this.$props.repos.path_name +
          "/commits?per_page=100"
      );
      return response.data;
    },
    createMemberGraph(data) {
      let end = new Date(data[0].commit.author.date.slice(0, 10));
      let start = new Date(
        data[data.length - 1].commit.author.date.slice(0, 10)
      );
      let labels = [];
      let commits = [];
      let k = data.length - 1;
      while (start <= end) {
        labels.push(start.getMonth() + 1 + "월 " + start.getDate() + "일");
        commits.push(0);
        while (k >= 0) {
          var dt = new Date(data[k].commit.author.date.slice(0, 10));
          if (dt - start == 0) {
            commits[commits.length - 1] += 1;
            k -= 1;
          } else {
            break;
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
              data: commits,
              backgroundColor: this.$props.repos.color[0],
              borderColor: this.$props.repos.color[1],
              borderWidth: 2
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                }
              }
            ]
          },
          layout: {
            padding: 5
          }
        }
      });
    }
  },
  mounted() {
    var commits = this.getCommits();
    commits.then(data => {
      this.createMemberGraph(data);
    });
  }
};
</script>

<style>
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.repo-btn:link,.repo-btn:visited,.repo-btn:active{
  color:#181818;
  text-decoration: none;
}
.card-shadow {
  box-shadow: none !important;
  display: inline-block;
  border: solid 0px;
  height: 270px;
  width: 363px;
  background-color: #fff;
}
</style>
