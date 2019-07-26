<template>
	<Carousel3d :controls-visible="true" style="height: 320px!important;padding: 20px;">
		<Slide
			:index='i-1' v-for="i in repositories.length > limits ? limits : repositories.length"
			class="repo-card">
			<Repository :repos="repositories[i - 1]"></Repository>
		</Slide>
	</Carousel3d>
  <!-- <v-layout column py-4>
    <v-flex xs12 md6 v-for="i in repositories.length > limits ? limits : repositories.length">
      <Repository :repos="repositories[i - 1]"></Repository>
    </v-flex>
  </v-layout> -->
</template>

<script>
import Repository from '@/components/repository/Repository'
import {Carousel3d, Slide} from 'vue-carousel-3d'

export default {
	name: 'RepositoryList',
	props: {
		limits: {type: Number, default: 5},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			repositories: [
				{"username":"naye0ng <김나영>", "path_name": "naye0ng/Grape-Theme","http_url":"https://github.com/naye0ng/Grape-Theme","image":"na.png",
				"color": ["rgba(255, 99, 132, 0.2)","rgba(255,99,132,1)"]},
				{"username":"ehddnr8813 <김동욱>", "path_name": "ehddnr8813/Algorithm_baekjoon","http_url":"https://github.com/ehddnr8813/Algorithm_baekjoon","image":"dong.png",
				"color": ["rgba(54, 162, 235, 0.2)","rgba(54, 162, 235, 1)"]},
				{"username":"hanaluana <박해원>", "path_name": "hanaluana/deep_learning","http_url":"https://github.com/hanaluana/deep_learning","image":"won.png",
				"color": ["rgba(255, 206, 86, 0.2)","rgba(255, 206, 86, 1)"]},
				{"username":"ahlim721 <임현아>", "path_name": "ahlim721/dna_railro","http_url":"https://github.com/ahlim721/dna_railro","image":"ha.png",
				"color": ["rgba(75, 192, 192, 0.2)","rgba(75, 192, 192, 1)"]},
				{"username":"YongbeomJo <조용범>", "path_name": "YongbeomJo/vscore-repo","http_url":"https://github.com/YongbeomJo/vscore-repo","image":"jo.png",
				"color": ["rgba(153, 102, 255, 0.2)","rgba(153, 102, 255, 1)"]},
			]
    	}
	},
	components: {
		Repository,
		Carousel3d,
		Slide,
	},
}
</script>
<style>
.repo-card{
	border-radius: 15px!important;
	border-width: 0px!important;
    border: solid 0px #fff;
    color: rgba(0,0,0,0.87);
	box-shadow: 0px 3px 20px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    text-decoration: none;
}
.carousel-3d-controls span{
	font-family: 'roboto', sans-serif;
	color: #EC407A;
}

</style>
