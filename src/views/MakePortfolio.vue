<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">Portfolio Writer</div>
    </ImgBanner>
    <v-container>

      <!-- Portfolio Writer -->
      <portfolio-writer></portfolio-writer>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioWriter from '../components/yongbeom/PortfolioWriter'
export default {
	name: 'Makeportfolio',
	components: {
		ImgBanner,
    PortfolioWriter
	},
}
</script>
