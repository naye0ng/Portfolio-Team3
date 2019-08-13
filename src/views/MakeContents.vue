<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em;" slot="text">{{kind}} Writer</div>
    </ImgBanner>
    <v-container ref="destination">

      <!-- Portfolio Writer(check kind status) -->
      <portfolioWriter v-if="kind==='Portfolio'"></portfolioWriter>

      <!-- Post Writer -->
      <postWriter v-if="kind==='Post'"></postWriter>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/template/ImgBanner'
import PortfolioWriter from '../components/portfolio/PortfolioWriter'
import PostWriter from '../components/post/PostWriter'

export default {
	name: 'Makeportfolio',
	components: {
		ImgBanner,
    PortfolioWriter,
    PostWriter
  },
  computed: {
    kind(){ // Get Contents type from router
      return this.$route.params.kind
    }
  },
  methods:{
    goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
    }
  },
  mounted(){
    setTimeout(() => {
      this.goto("destination")
    })

  }
}
</script>
