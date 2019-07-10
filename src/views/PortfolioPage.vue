<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>

      <!-- Portfolio Writer -->
      <portfolio-writer></portfolio-writer>
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="4" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PortfolioWriter from '../components/yongbeom/PortfolioWrite'
/* import PortfolioWriter from '../components/PortfolioWriter'
 */
export default {
	name: 'PortfolioPage',
	components: {
		ImgBanner,
		PortfolioList,
    PortfolioWriter
	},
}
</script>
