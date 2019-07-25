<template>
  <v-layout mt-5 wrap>
    <v-flex style="z-index:99;" v-for="i in portfolios.length > pageLimit ? pageLimit : portfolios.length" xs12 sm6 lg3>
      <Portfolio class="ma-3"
              :date="portfolios[i - 1].created_at.toString()"
              :title="portfolios[i - 1].title"
              :body="portfolios[i - 1].body"
              :imgSrc="portfolios[i - 1].img"
      ></Portfolio>
    </v-flex>

    <!-- <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="primary" dark v-on:click="loadMorePortfolios"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
    </v-flex> -->
    
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore" class="bg-1">
      <button v-on:click="loadMorePortfolios" class="button button--wayra button--border-medium button--text-medium button--size-s" style="max-width: 150px;padding:0.5em 1em;">
        더 보기
      </button>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from '@/components/Portfolio'
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
		async getPortfolios() {
			this.portfolios = await FirebaseService.getPortfolios()
		},
		loadMorePortfolios() {
      this.loadMore = true;
      this.pageLimit += 4;
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
