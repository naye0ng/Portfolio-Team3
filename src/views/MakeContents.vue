<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">{{kind}} Writer</div>
    </ImgBanner>
    <v-container>
      
      <!-- Portfolio Writer -->
      <portfolioWriter v-if="kind==='portfolio'"></portfolioWriter>
      
      <!-- Post Writer -->
      <postWriter v-if="kind==='post'"></postWriter>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioWriter from '../components/yongbeom/PortfolioWriter'
import PostWriter from '../components/yongbeom/PostWriter'

export default {
	name: 'Makeportfolio',
	components: {
		ImgBanner,
    PortfolioWriter,
    PostWriter
  },
  computed: {
    kind(){
      return this.$route.params.kind
    }
  }
}
</script>
