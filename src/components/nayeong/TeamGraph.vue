<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <p class="display-3 my-5 pt-3 text-xs-center team-graph-font">Hi, We are Team3!</p>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Team3 Total Commits</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="teamChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Commit by Members</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="memberChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">Our Site Visitors</h3>
          </v-card-title>
          <div style="padding: 5px 10px; margin-bottom:20px;">
            <canvas id="todayChart" width="100%" class="mb-1"></canvas>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 px-3 py-3>
        <v-card style="padding:10px;">
          <v-card-title primary-title>
            <h3 class="headline mb-2" style="width:100%;text-align:center;">How to sign in our site</h3>
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
    async getCommits() {
      var response = await axios.get(
        "https://api.github.com/repos/naye0ng/Portfolio-Team3/commits?per_page=100"
      );
      return response.data;
    },
    createTeamGraph(data) {
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
      var ctx = document.getElementById("teamChart");
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
    },
    createMemberGraph(data) {
      var m_na = 0;
      var m_won = 0;
      var m_ah = 0;
      var m_tong = 0;
      var m_jo = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        let author = data[i].commit.author.name;
        if (author == "naye0ng") {
          m_na += 1;
        } else if (author == "Park Haewon") {
          m_won += 1;
        } else if (author == "Yongbeom Jo") {
          m_jo += 1;
        } else if (author == "KimTongWook") {
          m_tong += 1;
        } else {
          m_ah += 1;
        }
      }
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
    },
    createVisitorChart() {
      var dates = [];
      var visitor = [];
      firebase
        .database()
        .ref()
        .child("logs")
        .on("value", snapshot => {
          var logs = snapshot.val();
          dates = Object.keys(logs);
          dates.forEach(date => {
            visitor.push(Object.keys(logs[date]).length);
          });
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
      var socialName = [];
      var socialLogin = [];
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
          var ctx = document.getElementById("socialChart");
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
        });
    }
  },
  mounted() {
    // git graph
    var commits = this.getCommits();
    commits.then(data => {
      this.createTeamGraph(data);
      this.createMemberGraph(data);
    });

    // team3 web site graph
    this.createVisitorChart();
    this.socialLoginChart();
  }
};
</script>
