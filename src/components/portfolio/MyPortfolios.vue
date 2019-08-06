<template>
  <v-layout row justify-center wrap> 
    <!-- Portfolio -->
    <v-flex xs12 v-if="userports">
      <v-layout row wrap mw-700 class="bg-3">
        <v-flex v-for="i in userports.length > limit ? limit : userports.length" xs6 px-3>
          <!-- Give post infomation to each Post.vue -->
          <Portfolio class="ma-3"
            :email="userports[i - 1].user"
            :date="userports[i - 1].created_at.toString()"
            :title="userports[i - 1].title"
            :body="userports[i - 1].body"
            :imgSrc="userports[i - 1].img"
            :id="userports[i - 1].id"
            >
          </Portfolio>
        </v-flex>
        <v-flex xs12 text-xs-center round my-5 v-if="loadmoreport && userports" class="bg-1">
          <button v-on:click="loadMorePortfolios" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
            더 보기
          </button>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import Portfolio from "@/components/portfolio/Portfolio";

export default {
  name: "MyPortfolios",
  components : {
    Portfolio,
  },
  props:{
    useremail: {type: String},
    portfolios: {type: Array},
  },
  data() {
    return {
      userports:[],
      limit:4,
      user: "",
      loadmoreport:true,
      portfolioss:this.portfolios,
    }
  },
  methods: {
    async getUserPortfolios(){
      this.userports = await this.portfolioss.filter(port=>{
        return port.user == this.useremail;
      })
    },
    loadMorePortfolios() {
      this.loadmoreport = true;
      this.limit += 4;
    },
  },
  watch:{
    portfolios: function(){
      this.portfolioss = this.portfolios
      this.getUserPortfolios();
    }
  }
};
</script>
<style>
* {
  z-index: 99;
}
</style>
