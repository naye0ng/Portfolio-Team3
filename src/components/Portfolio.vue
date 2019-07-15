<template>
  <div>
    <v-card router :to="{
      name: 'portdetail',
      params: {
        title: title,
        body: body,
        imgSrc: imgSrc
      }}" exact>
      <v-img :src="imgSrc" height="200px">
      </v-img>
      <v-card-title primary-title>
          <v-flex xs12>
            <div class="headline port-title">{{title}}</div>
          </v-flex>
          <v-flex xs12>
            <div v-html="body" class="grey--text port-body"></div>
          </v-flex>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
	name: 'Portfolio',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
	},
	data() {
		return {
			dialog : false
		}
	}
}
</script>

<style>

.port-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p {
    margin-bottom: 0;  
  }

.port-body {
  margin-top : 0.4em;
  height: 4.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

p {
  margin-bottom : 0px;
}

</style>
