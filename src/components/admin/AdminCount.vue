<template>
<div id="site-data">
    <v-layout row wrap mb-5>
        <v-flex xs6 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">POST</h3>
            </v-card-title>
            <div class="result-num">{{ numPost }}</div>
            </v-card>
        </v-flex>
        <v-flex xs6 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">PORTFOLIO</h3>
            </v-card-title>
            <div class="result-num">{{ numPortfolio }}</div>
            </v-card>
        </v-flex>
        <v-flex xs6 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">총 가입자</h3>
            </v-card-title>
            <div class="result-num">{{ numUser }}</div>
            </v-card>
        </v-flex>
        <v-flex xs6 sm3 px-3 py-3>
            <v-card class="graph-card google-analytics" style="height:100%;"  @click="getAnalytics">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">Google Analytics</h3>
            </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout row wrap mb-5 px-3>
        <v-flex xs12>
            <iframe 
                src="https://datastudio.google.com/embed/reporting/18LHBcxeIXFg93s9Geu2kkUf8ow_AaSga/page/1M" 
                frameborder="0" 
                allowfullscreen
                scrolling="100%"
                width="100%"
                height="550px"
                class='google-iframe'
                ></iframe>
      </v-flex>
    </v-layout>
    </div>
</template>
<script>
import firebase from "firebase";
import FirebaseService from "@/services/FirebaseService";

export default{
    data (){
      return{
        numPost: 0,
        numPortfolio: 0,
        numUser : 0,
      }
    },
    methods : {
        async getPosts() {
            var posts = await FirebaseService.getPosts()
            this.numPost = posts.length
        },
        async getPortfolios() {
            var portfolios = await FirebaseService.getPortfolios()
            this.numPortfolio = portfolios.length
        },
        getUsers() {
            firebase.database().ref().child("user").on("value", snapshot => {
                var user = snapshot.val();
                this.numUser = Object.keys(user).length
            })
        },
        getAnalytics() {
          window.open("https://analytics.google.com/analytics/web/");
        }
    },
    mounted() {
        this.getPosts()
        this.getPortfolios()
        this.getUsers()
    }
  }
</script>
<style>
.graph-card.google-analytics.v-card.v-sheet.theme--light{
    background-color: #ec407a!important;
}
.google-analytics .v-card__title.v-card__title--primary{
    height: calc(100% - 10px);
    cursor: pointer;
}
.google-analytics .mb-2.card-title{
    font-size: 2rem!important;
    line-height: 2.7rem;
}
.graph-card.google-analytics.v-card.v-sheet.theme--light:hover{
    background-color: #181818!important;
    color:#fff;
}

@media (max-width: 960px) {
  #site-data{
    padding-left: 30px;
    padding-right: 30px;
  }
  .google-iframe{
      height: 490px!important;
  }
}
@media (max-width: 700px) {
  .google-iframe{
      height: 500px!important;
  }
}
@media (max-width: 400px) {
  .google-iframe{
      height: 200px!important;
  }
}
</style>
