<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">Portfolio</div>
    </ImgBanner>
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
