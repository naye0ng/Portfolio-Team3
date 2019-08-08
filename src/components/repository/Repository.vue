<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
  <div class="card-shadow">
    <v-card-text class="headline font-weight-bold" style="padding-top:30px;">
      <canvas :id="repos.username" width="100%" height="50%"></canvas>
    </v-card-text>
    <a :href="repos.http_url" class="repo-btn">
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
import firebase from "firebase";

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
    initCommitData(){
      var today = new Date().toString().slice(0,15)
      firebase.database().ref().child("commits").child(today).child('members').child(this.$props.repos.nickname).on("value", snapshot => {
        var members = snapshot.val();
        if(members === null){
          // commits데이터가 없을때
          // var commits = this.getCommits();
          this.getCommits().then(data => {
            this.createCommitData(data);
            drawCommitGraph(data)
          });
        }
        else {
          // 차트 그리기
          drawCommitGraph(members)
        }
      })  
    },
    getImgUrl(img) {
      return require("@/assets/" + img);
    },
    async getCommits() {
      var response = await axios.get(
        "https://api.github.com/repos/" +
          this.$props.repos.path_name +
          "/commits?per_page=100"
      );
      return response.data;
    },
    createCommitData(data) {
      if (data){
        let end = new Date(data[0].commit.author.date.slice(0, 10));
        let start = new Date(
          data[data.length - 1].commit.author.date.slice(0, 10)
        );
        let labels = [];
        let commits = [];
        let k = data.length - 1;
        // 첫날과 마지막 날을 기준으로 data에서 commit을 추출한다.
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
        var result = {
          label : labels,
          data : commits,
        }
        firebase.database().ref().child("commits").child(today).child('member').child(this.$props.repos.nickname).set(result);
        return result
      }
    },
    drawCommitGraph(data){
      var ctx = document.getElementById(this.$props.repos.username);
        if (labels){
          var teamChart = new chart.Chart(ctx, {
            type: "line",
            data: {
              labels: data.label,
              datasets: [
                {
                  data: data.data,
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
    }
  },
  mounted() {
    // this.initCommitData()
  }
};
</script>

<style>
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.repo-btn:link,
.repo-btn:visited,
.repo-btn:active {
  color: #181818;
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
