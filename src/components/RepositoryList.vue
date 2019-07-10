<template>
  <v-layout column px-4>
    <v-flex v-for="i in repositories.length > limits ? limits : repositories.length">
      <v-divider v-if="i === 1"></v-divider>
      <Repository :repos="repositories[i - 1]"></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from '@/components/Repository'

export default {
	name: 'RepositoryList',
	props: {
		limits: {type: Number, default: 5},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			repositories: [
				{"username":"naye0ng <김나영>", "path_name": "naye0ng/Grape-Theme","http_url":"https://github.com/naye0ng/Grape-Theme",
				"color": ["rgba(255, 99, 132, 0.2)","rgba(255,99,132,1)"]},
				{"username":"ehddnr8813 <김동욱>", "path_name": "ehddnr8813/Algorithm","http_url":"https://github.com/ehddnr8813/Algorithm",
				"color": ["rgba(54, 162, 235, 0.2)","rgba(54, 162, 235, 1)"]},
				{"username":"hanaluana <박해원>", "path_name": "hanaluana/deep_learning","http_url":"https://github.com/hanaluana/deep_learning",
				"color": ["rgba(255, 206, 86, 0.2)","rgba(255, 206, 86, 1)"]},
				{"username":"ahlim721 <임현아>", "path_name": "ahlim721/dna_railro","http_url":"https://github.com/ahlim721/dna_railro",
				"color": ["rgba(75, 192, 192, 0.2)","rgba(75, 192, 192, 1)"]},
				{"username":"YongbeomJo <조용범>", "path_name": "YongbeomJo/vscore-repo","http_url":"https://github.com/YongbeomJo/vscore-repo",
				"color": ["rgba(153, 102, 255, 0.2)","rgba(153, 102, 255, 1)"]},
			]
    }
	},
	components: {
		Repository
	},
}
</script>
