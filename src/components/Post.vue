<template>
  <div>
    <v-layout py-4 h-100>
      <v-flex @click="showModal" row>
        <div class="caption">{{formatedDate}}</div>
        <h2 class="color-333 headline post-title font-weight-heavy">{{title}}</h2>
        <p v-html="body" class="mb-1 color-666 font-weight-light post-body subheading"></p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title primary-title>
            <h2 class="color-333 headline font-weight-heavy">{{title}}</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="caption">{{formatedDate}}</div>
            <p v-html="body" class="color-666 font-weight-light subheading"></p>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
	name: 'Post',
	props: {
		date: {type: Date},
		title: {type: String},
		body: {type: String}
	},
  data() {
    return {
      dialog : false
    }
  },
  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
    }
  },
  methods : {
    showModal() {
      this.dialog=true
    }
  }
}
</script>
<style>
  .color-666 {
    color: #666;
  }
  .color-333 {
    color: #333;
  }
  .h-100 {
    height: 100%;
  }
  .post-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .post-body {
    max-height: 6.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
