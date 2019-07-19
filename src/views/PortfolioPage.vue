<template>
  <div>
    <ImgBanner>
      <div slot="text">Portfolio</div>
    </ImgBanner>
<<<<<<< HEAD
    <!-- <v-container> -->

      <!-- Portfolio Writer -->
      <v-layout justify-center>
        <v-flex xs11>
          <v-layout wrap align-center justify-end>
            <v-flex xs2 mt-5 pl-4 class="bg-1">
              <!-- <v-btn color="secondary" router :to="{
                name: 'makecontents',
                params: {
                  kind: 'portfolio'
                }}" exact dark width="100%">
                <v-icon size="25" class="mr-2">border_color</v-icon>
                <span class="hidden-sm-and-down">포트폴리오 작성</span>
              </v-btn> -->
              <router-link :to="{
                name: 'makecontents',
                params: {
                  kind: 'Portfolio'
                }}">
                <button
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
    <!-- </v-container> -->
=======
    <v-layout justify-center>
      <v-flex xs11>
        <v-layout wrap align-center justify-end>
          <!-- Write button -->
          <v-flex xs2 mt-5>
            <v-btn color="#0F9D58" @click="checkuesr" dark width="100%" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">border_color</v-icon> 포트폴리오 작성
            </v-btn>
            <v-btn color="#0F9D58" @click="checkuesr" dark width="100%" class="hidden-md-and-up">
              <v-icon size="25" class="mr-2">border_color</v-icon>
            </v-btn>
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
>>>>>>> userinpost
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'

export default {
	name: 'PortfolioPage',
	components: {
		ImgBanner,
		PortfolioList,
  },
  methods : {
    checkuesr(){
      if(!this.$store.state.user) {
        this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'need to login'
        });
      }
      else{
        this.$router.push({ name: 'makecontents', params: { kind: 'portfolio' }})
      }
    }
  }
}
</script>
