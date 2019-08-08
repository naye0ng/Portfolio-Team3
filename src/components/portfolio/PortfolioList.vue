<template>
  <v-layout mt-5 wrap>
    <v-flex style="z-index:99;" v-for="i in portfolios.length > pageLimit ? pageLimit : portfolios.length" xs12 sm6 lg3>
      <Portfolio class="ma-3"
              :email="portfolios[i - 1].user"
              :date="portfolios[i - 1].created_at.toString()"
              :title="portfolios[i - 1].title"
              :body="portfolios[i - 1].body"
              :fireImg="portfolios[i - 1].fireUrl"
              :dataImg="portfolios[i - 1].dataUrl"
              :id="portfolios[i - 1].id"
      ></Portfolio>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore && portfolios && pageLimit<portfolios.length" class="bg-1">
      <button v-on:click="loadMorePortfolios" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
        더 보기
      </button>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore && portfolios && portfolios.length>4 && pageLimit>=portfolios.length" class="bg-1">
      <button v-on:click="foldPortfolios" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
        접기
      </button>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from '@/components/portfolio/Portfolio'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PortfoliosList',
	props: {
		limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
      portfolios: [],
      pageLimit : this.limits
		}
	},
	components: {
		Portfolio
	},
  mounted() {
    this.getPortfolios()
  },
	methods: {
    // Get All Portfolios infomation from firestore database
		async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios()
      this.$store.state.isLoading = false;
		},
		loadMorePortfolios() {
      this.loadMore = true;
      this.pageLimit += 4;
    },
    foldPortfolios(){
      this.pageLimit = 4;
      
    }
	},
}
</script>
<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
