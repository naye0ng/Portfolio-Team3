<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2
          class="my-5 py-5 text-xs-center text-shadow homepage-title"
          style="color:#fff;font-size:4.3vw;"
        >Hi, We are Team3!</h2>
      </v-flex>
      <v-flex xs12 px-3 py-3>
        <v-card class="graph-card" style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Team3 member Commits</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="memberCommitChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card class="graph-card" style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Team3 Total Commits</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="teamChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card class="graph-card" style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Commit by Members</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="memberChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card class="graph-card" style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Our Site Visitors</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="todayChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card class="graph-card" style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">User Login Statistics</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="socialChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import chart from "chart.js";
import axios from "axios";
import firebase from "firebase";

export default {
  name: "TeamGraph",
  methods: {
    // 한번 호출할 때마다 최대 100개의 commit을 받아온다.
    async getCommits(API_URL, data) {
      var response = await axios.get(API_URL);
      data = data.concat(response.data);
      var header = response.headers.link.split(", ")[0];
      header = header.split("; ");
      var nextUrl = header[0].slice(1, -1);
      var isNext = header[1] === 'rel="next"' ? true : false;

      if (isNext) {
        // 다음 호출이 필요한 경우(isNext === true) 재귀적으로 getCommits함수를 호출한다.
        this.getCommits(nextUrl, data);
      } else {
        this.$store.state.isLoading = false;
        setTimeout(() => {
          this.createDateMemberCommitGraph(data)
          this.createTeamGraph(data)
          this.createMemberGraph(data)
          // team3 web site graph
          this.createVisitorChart()
          this.socialLoginChart()
        }, 300);
      }
    },
    createDateMemberCommitGraph(data){
      if (data){
        let end = new Date(data[0].commit.author.date.slice(0, 10));
        let start = new Date(data[data.length - 1].commit.author.date.slice(0, 10));
        
        let nana = []
        let hazel = []
        let eddy = []
        let richard = []
        let anna = []

        let labels = []
        
        let k = data.length - 1;
        while (start <= end) {
          labels.push(start.getMonth() + 1 + "월 " + start.getDate() + "일");
          nana.push(0)
          hazel.push(0)
          eddy.push(0)
          richard.push(0)
          anna.push(0)
          while (k >= 0) {
            var commitDate = new Date(data[k].commit.author.date.slice(0, 10));
            if(commitDate - start == 0){
              let strCommit = data[k].commit.message
              if (strCommit.split(' ')[0] != 'Merge'){ 
                let author = data[k].commit.author.name;
                if (author == "naye0ng") {
                  nana[nana.length - 1] += 1
                } else if (author == "Park Haewon") {
                  hazel[hazel.length - 1] += 1
                } else if (author == "Yongbeom Jo") {
                  richard[richard.length - 1] += 1
                } else if (author == "KimTongWook" || author == "ehddnr8813") {
                  eddy[eddy.length - 1] += 1
                } else {
                  anna[anna.length - 1] += 1
                }
              }
              k -= 1
            }else {
              break
            }
          }
          start.setDate(start.getDate() + 1);
        }
        var ctx = document.getElementById("memberCommitChart");
        var teamChart = new chart.Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "김나영",
                data: nana,
                backgroundColor: ["rgba(255,99,1325, 0.2)"],
                borderColor: ["rgba(255,99,132, 1)"],
                borderWidth: 1
              },
              {
                label: "김동욱",
                data: eddy,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1
              },
              {
                label: "박해원",
                data: hazel,
                backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 206, 86, 1)"],
                borderWidth: 1
              },
              {
                label: "임현아",
                data: anna,
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1
              },
              {
                label: "조용범",
                data: richard,
                backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                borderColor: ["rgba(153, 102, 255, 1)"],
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            layout: {
              padding: 5
            }
          }
        });
      }
    },
    createTeamGraph(data) {
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
        // Chart.js
        var ctx = document.getElementById("teamChart");
        if (commits){
          var teamChart = new chart.Chart(ctx, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "# commits",
                  data: commits,
                  backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                  borderColor: ["rgba(153, 102, 255, 1)"],
                  borderWidth: 1
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              layout: {
                padding: 5
              }
            }
          });
        }
      }
    },
    createMemberGraph(data) {
      var m_na = 0;
      var m_won = 0;
      var m_ah = 0;
      var m_tong = 0;
      var m_jo = 0;
      // data에서 멤버별 커밋 수를 카운트한다.
      if (data){
        for (let i = data.length - 1; i >= 0; i--) {
          let strCommit = data[i].commit.message
          if (strCommit.split(' ')[0] != 'Merge'){ 
            let author = data[i].commit.author.name;
            if (author == "naye0ng") {
              m_na += 1;
            } else if (author == "Park Haewon") {
              m_won += 1;
            } else if (author == "Yongbeom Jo") {
              m_jo += 1;
            } else if (author == "KimTongWook" || author == "ehddnr8813") {
              m_tong += 1;
            } else {
              m_ah += 1;
            }
          }
        }
        // Chart.js
        var ctx = document.getElementById("memberChart");
        var memberChart = new chart.Chart(ctx, {
          type: "bar",
          data: {
            labels: ["김나영", "김동욱", "박해원", "임현아", "조용범"],
            datasets: [
              {
                label: "# commit",
                data: [m_na, m_tong, m_won, m_ah, m_jo],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            layout: {
              padding: 5
            }
          }
        });
      }

    },
    createVisitorChart() {
      var today = new Date();
      var dates = [];
      for (var i = 4; i >= 0; i--) {
        var some_date = new Date();
        some_date.setDate(today.getDate() - i);
        dates.push(some_date.toDateString());
      }
      var visitor = [];
      firebase
        .database()
        .ref()
        .child("logs")
        .on("value", snapshot => {
          var logs = snapshot.val();
          dates.forEach(date => {
            // 방문자가 존재하지 않는 날은 0으로 처리
            visitor.push(
              logs.hasOwnProperty(date) ? Object.keys(logs[date]).length : 0
            );
          });
          // Chart.js
          var ctx = document.getElementById("todayChart");
          var teamChart = new chart.Chart(ctx, {
            type: "line",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "# visitors",
                  data: visitor,
                  backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                  borderColor: ["rgba(255, 99, 132, 1)"],
                  borderWidth: 1
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              layout: {
                padding: 5
              }
            }
          });
        });
    },
    socialLoginChart() {
      var socialName = []; // 사용자들이 로그인한 소셜
      var socialLogin = []; // 소셜별 로그인 횟수
      firebase
        .database()
        .ref()
        .child("social")
        .on("value", snapshot => {
          var social = snapshot.val();
          socialName = Object.keys(social);
          socialName.forEach(name => {
            socialLogin.push(social[name]);
          });
          // Chart.js
          var ctx = document.getElementById("socialChart");
          if (socialLogin){
            var memberChart = new chart.Chart(ctx, {
              type: "pie",
              data: {
                labels: socialName,
                datasets: [
                  {
                    label: "# social",
                    data: socialLogin,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)"
                    ],
                    borderColor: [
                      "rgba(255,99,132,1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)"
                    ],
                    borderWidth: 1
                  }
                ]
              }
          });
          }

        });
    },
    async asyncForEach(nextUrl, data) {
      for (let index = 0; index < nextUrl.length; index++) {
        await this.getCommits(nextUrl[index].split(">;")[0].slice(1)).then(
          res2 => {
            data = data.concat(res2.data);
          }
        );
      }
      return data;
    }
  },
  mounted() {
    // Draw git graph
    this.getCommits(
      "https://api.github.com/repos/naye0ng/Portfolio-Team3/commits?per_page=100",
      []
    );
  }
};
</script>
<style>
.theme--light.v-sheet {
  background-color: rgba(250, 250, 250, 0.97) !important;
}
</style>
