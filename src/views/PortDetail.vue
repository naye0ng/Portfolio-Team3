<template>
  <div>
    <v-container>
      <v-layout my-5 wrap>
        <!-- Title -->
        <!-- <v-flex xs12>
                <div class="mb-3">{{title}}</div>
        </v-flex>-->

        <!-- Image -->
        <!-- <v-flex xs12>
                    <v-img :src="imgSrc"></v-img>
        </v-flex>-->

        <!-- Contentes -->
        <!-- <v-flex xs12>
                <br/>
                    <p v-html="body"></p>
        </v-flex>-->
        <v-flex xs12 sm8 offset-sm2 mt-5>
          <v-card elevation-5>
            <v-img :src="imgSrc"></v-img>
            <v-card-title primary-title>
              <div style="width:100%;">
                <h3 class="headline mb-1">{{title}}</h3>
                <hr style="height:2.8px; background-color:#FFBA6C;">
                <div class="mt-2"><p v-html="body"></p></div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- go back button -->
        <v-flex xs12 text-xs-center round mb-5>
          <v-btn color="none" text-xs-center dark to="/">
            <v-icon size="25" class="mr-2">fa-arrow-left</v-icon>돌아가기
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";

export default {
  name: "PortDetail",
  components: {
    PortfolioList
  },
  computed: {
    title() {
      return this.$route.params.title;
    },
    imgSrc() {
      return this.$route.params.imgSrc;
    },
    body() {
      return this.$route.params.body;
    }
  }
};
</script>
