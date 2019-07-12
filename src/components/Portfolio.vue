<template>
  <div>
    <v-card @click="showModal" hover='true'>
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

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-img :src="imgSrc" min-height="200px" max-height="300px"></v-img>
          <v-card-title primary-title>
              <v-flex xs12>
                <div class="headline">{{title}}</div>
              </v-flex>
              <v-flex xs12>
                <div v-html="body" class="grey--text port-body"></div>
              </v-flex>
          </v-card-title>
        </v-card>
    </v-dialog>
  </v-layout>
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
	},
  methods : {
    showModal() {
      this.dialog = true;
      console.log(this.imgSrc)
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
