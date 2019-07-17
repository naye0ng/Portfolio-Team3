<template>
  <div>
    <v-layout pt-3 pb-3 pl-3 h-100>
      <v-flex
        @click="showModal"
        row
        style="cursor:pointer; height:80px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
      >
        <div class="color-333 headline post-title font-weight-heavy">{{title}}</div>
        <div class="caption grey--text mt-1">{{formatedDate}}</div>
        <span v-html="body" class="mb-2 mt-2 font-weight-light post-body color-666"></span>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-card-title primary-title class="pb-1 pt-3">
            <h2 class="color-333 headline font-weight-heavy">{{title}}</h2>
            <v-spacer></v-spacer>
            <div class="caption grey--text pt-3">{{formatedDate}}</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p v-html="body" class="color-666 font-weight-light subheading"></p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-0">
            <v-btn flat color="primary" @click="dialog=false" class="pl-0 pr-0 ml-1">close</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`;
    }
  },
  methods: {
    showModal() {
      this.dialog = true;
    }
  }
};
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
