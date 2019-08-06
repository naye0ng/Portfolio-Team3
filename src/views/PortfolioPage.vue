<template>
  <div>
    <ImgBanner>
      <div slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>
      <!-- Portfolio Writer -->
      <v-layout justify-center>
        <v-flex xs11>
          <v-layout wrap align-center justify-end>
            <v-flex xs2 mt-5 pl-4 class="bg-1">
              <router-link :to="{
                name: 'makecontents',
                params: {
                  kind: 'Portfolio' // MakeContents.vue will call PortfolioWriter.vue
                }}">
                <!-- v-if : Check login status -->
                <button
                  v-if="user != null && $store.getters.dbuser.accessLevel>=1"
                  class="button button--wayra button--border-medium button--text-medium button--size-s"
                  style="max-width: 160px;padding:0.5em 1em;">
                  포트폴리오 작성
                </button>
              </router-link>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Portfolio List -->
      <v-layout justify-center>
        <v-flex xs11>
          <PortfolioList :limits="4" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/template/ImgBanner'
import PortfolioList from '../components/portfolio/PortfolioList'

export default {
	name: 'PortfolioPage',
	components: {
		ImgBanner,
		PortfolioList,
  },
  beforeCreate(){
    this.$store.state.isLoading = true
  },
  computed: {
    user(){ // Get user infomation from vuex
      return this.$store.getters.getUser;
    }
  }
}
</script>
