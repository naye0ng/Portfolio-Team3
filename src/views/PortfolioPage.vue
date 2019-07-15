<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>

      <!-- Portfolio Writer -->
      <v-flex xs12 text-xs-center>
        <v-btn color="info" router :to="{
          name: 'makecontents',
          params: {
            kind: 'portfolio'
          }}" exact>
          <v-icon size="25" class="mr-2">border_color</v-icon> 포트폴리오 작성
        </v-btn>
      </v-flex>

      <!-- Portfolio List -->
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

export default {
	name: 'PortfolioPage',
	components: {
		ImgBanner,
		PortfolioList,
	}
}
</script>
