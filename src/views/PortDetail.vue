<template>
  <v-layout
    align-center
    justify-center
    row
    fill-height
    style="background-color:#000000;"
  >
    <div class="stars"></div>
    <div class="twinkling"></div>
    <!-- </div> -->
    <v-container id="portcard" class="mt-3">
      <v-layout my-5 wrap>
        <v-flex xs12 sm8 offset-sm2 mt-5>
          <v-card>
            <v-img
              :src="port.img"
              contain
              style="max-height:70vh; max-width:70vw; background-color:#000000;"
            >
              <v-container fluid pa-2>
                <v-layout>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text ml-2" v-text="port.title"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <div style="background-color:#ffffff;">
              <v-card-text class="pb-0 pl-4">
                <div v-html="port.body" style="font-size:1.24rem;"></div>
              </v-card-text>
              <v-card-actions class="pl-3 pt-0">
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
            </div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- go back button -->
        <v-flex xs12 text-xs-center round class="bg-3">
          <router-link to="/portfolio">
            <button
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >리스트로</button>
          </router-link>
          <router-link to="/">
            <button
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >홈으로</button>
          </router-link>
          <!-- EditBtn, RemoveBtn check login user's email match with portfolio's email infomation-->
          <!-- EditBtn pass portfolio infomation to PortfolioWriter.vue -->
          <router-link
            :to="{
            name: 'makecontents',
            params: {
              kind: 'Portfolio', // MakeContents.vue will call PortfolioWriter.vue
              title: port.title,
              id: port.id,
              body: port.body,
              imgSrc: port.img,
            }}"
          >
            <button
              v-if="port.user == userEmail"
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >수정하기</button>
          </router-link>
          <router-link to="/portfolio">
            <button
              v-if="port.user == userEmail"
              v-on:click="deletePortfolio"
              class="button button--wayra button--border-medium button--text-medium button--size-s"
              style="max-width: 150px;padding:0.5em 1em; margin:0.5em;"
            >삭제하기</button>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import PortfolioList from "../components/portfolio/PortfolioList";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortDetail",
  components: {
    PortfolioList
  },
  data() {
    return {
      port: ""
      /* 설명******************************
      port.img(해당 portfolio 의 이미지 url)
      port.title (제목)
      port.body (내용)
      port.user (해당 portfolio의 작성자 email)
      port.created_at (게시물 생성 날짜)
      port.id (게시물 id)
      */
    };
  },
  computed: {
    userEmail() {
      // 현재 로그인한 user의 이메일값
      var user = this.$store.getters.getUser;
      if (!user) return null;
      return this.$store.getters.getUser.email;
    }
  },
  mounted() {
    this.getPort();
  },
  methods: {
    async getPort() {
      this.port = await FirebaseService.getPortfolio(this.$route.params.id);
    },
    deletePortfolio() {
      FirebaseService.deletePortfolio(this.port.id, this.port.img);
    }
  }
};
</script>

<style>
.stars, .twinkling, .clouds {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
}
.stars {
  background:#000 url(../../public/images/stars.png) repeat top center;
  z-index:0;
}

.twinkling{
  background:transparent url(../../public/images/twinkling.png) repeat top center;
  z-index:1;

  -moz-animation:move-twink-back 200s linear infinite;
  -ms-animation:move-twink-back 200s linear infinite;
  -o-animation:move-twink-back 200s linear infinite;
  -webkit-animation:move-twink-back 200s linear infinite;
  animation:move-twink-back 200s linear infinite;
}
.clouds{
    background:transparent url(../../public/images/clouds.png) repeat top center;
    z-index:3;

  -moz-animation:move-clouds-back 200s linear infinite;
  -ms-animation:move-clouds-back 200s linear infinite;
  -o-animation:move-clouds-back 200s linear infinite;
  -webkit-animation:move-clouds-back 200s linear infinite;
  animation:move-clouds-back 200s linear infinite;
}
#portcard {
  position: relative;
  z-index: 99;
}
</style>
