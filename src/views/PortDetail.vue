<template>
  <div class="stars portdetail">
      <div class="twinkling"></div>
    <v-container id="portcard" class="mt-3">
      <v-layout my-5 wrap>
        <v-flex xs12 sm8 offset-sm2 mt-5>
          <v-card>
            <v-img :src="imgSrc" style="max-height:440px;">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text ml-2" v-text="title"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-actions class="mt-2 ml-2">
              <div v-html="body" style="font-size:1.24rem; margin-bottom:0;"></div>
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
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 text-xs-center round class="bg-3">
          <router-link to="/portfolio">
            <button class="button button--wayra button--border-medium button--text-medium button--size-s"
            style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
              리스트로
            </button>
          </router-link>
          <router-link to="/">
            <button class="button button--wayra button--border-medium button--text-medium button--size-s"
            style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
              홈으로
            </button>
          </router-link>
          <!-- EditBtn, RemoveBtn check login user's email match with portfolio's email infomation-->
          <!-- EditBtn pass portfolio infomation to PortfolioWriter.vue -->
          <router-link :to="{
            name: 'makecontents',
            params: {
              kind: 'Portfolio', // MakeContents.vue will call PortfolioWriter.vue
              title: title,
              id: id,
              body: body,
              imgSrc: imgSrc
            }}">
            <button v-if="portEmail == userEmail" class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
                수정하기
            </button>
          </router-link>
          <router-link to="/portfolio">
            <button v-if="portEmail == userEmail" v-on:click="deletePortfolio" class="button button--wayra button--border-medium button--text-medium button--size-s"
            style="max-width: 150px;padding:0.5em 1em; margin:0.5em;">
              삭제하기
            </button>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";
import FirebaseService from '@/services/FirebaseService'

export default {
  name: "PortDetail",
  components: {
    PortfolioList
  },
  computed: {
    // Get Portfolio infomation from router
    portEmail() {
      return this.$route.params.email;
    },
    id() {
      return this.$route.params.id;
    },
    title() {
      return this.$route.params.title;
    },
    body() {
      return this.$route.params.body;
    },
    imgSrc() {
      return this.$route.params.imgSrc;
    },
    date() {
      return this.$route.params.date;
    },

    // Get User infomation from vuex
    userEmail(){
      return this.$store.getters.getUser.email
    }
  },
  methods: {
    deletePortfolio(){
      FirebaseService.deletePortfolio(this.id, this.imgSrc);
    }
  }
};
</script>

<style>

.portdetail.stars{
  position:relative;
}
#portcard{
  position:relative;
  z-index:10;
}
</style>
