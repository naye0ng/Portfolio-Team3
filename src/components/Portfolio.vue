<template>
  <!-- Add route, parameter binding -->
  <v-card router :to="{
      name: 'portdetail',
      params: {
        title: title,
        body: body,
        imgSrc: imgSrc
      }
    }" exact>
    <v-img :src="imgSrc" min-height="200px" max-height="300px"></v-img>
    <v-card-title primary-title>
        <div>
          <div class="headline">{{title}}</div>
          <span v-html="body" class="grey--text port-body"></span>
        </div>
    </v-card-title>
  </v-card>
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

p {
    margin-bottom: 0;  
  }
.port-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.port-body {
  margin-top : 0.4em;
  height: 4.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

</style>
