<template>
    <v-layout row wrap mb-5>
        <v-flex xs12 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">POST</h3>
            </v-card-title>
            <div class="result-num">{{ numPost }}</div>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">PORTFOLIO</h3>
            </v-card-title>
            <div class="result-num">{{ numPortfolio }}</div>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">총 가입자</h3>
            </v-card-title>
            <div class="result-num">{{ numUser }}</div>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">실시간 사용량</h3>
            </v-card-title>
            <div class="result-num" @click="getAnalytics">GO</div>
            </v-card>
        </v-flex>
    </v-layout>
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
