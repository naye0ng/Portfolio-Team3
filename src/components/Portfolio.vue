<template>
  <div>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        color="white lighten-4"
        exact
        light
        :class="`elevation-${hover ? 24 : 2}`"
      >
        <v-img :src="imgSrc" height="40vh"></v-img>
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-ease-in-out black darken-1 v-card--reveal display-3 white--text"
            style="height: 100%; justify-content:center;"
          >
          <v-layout justify-center align-center row wrap>
            <v-flex xs12 text-xs-center style="font-size:0.6em; justify-content:center; margin-top:40px;">{{title}}</v-flex>
            <!-- <div v-html="body" class="d-flex" style="font-size:0.48em; text-align:center;"></div> -->
            <router-link :to="{name: 'portdetail',params: {title: title, body: body, imgSrc: imgSrc}}">
              <v-flex xs12 text-xs-center round my-5 class="bg-3">
              <button
                class="button button--wayra button--border-medium button--text-medium button--size-s"
                style="max-width: 150px;padding:0.5em 1em; opacity: 0.95;"
              >더 보기</button>
            </v-flex>
            </router-link>
          </v-layout>
          </div>
        </v-expand-transition>
        <!-- <v-card-title primary-title>
          <v-flex xs12>
            <div class="headline port-title">{{title}}</div>
          </v-flex>
          <v-flex xs12>
            <div v-html="body" class="grey--text port-body"></div>
          </v-flex>
        </v-card-title>-->
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {
      dialog: false
    };
  }
};
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
  margin-top: 0.4em;
  height: 4.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

p {
  margin-bottom: 0px;
}

.v-card--reveal {
  align-items: center;
  justify-content: center;
  bottom: 0;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
