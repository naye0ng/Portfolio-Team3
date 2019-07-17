<template>
  <div>
    <v-container>
      <v-layout my-5 wrap>
        <v-flex xs12 sm8 offset-sm2 mt-5>
          <!-- <v-card>
            <v-img :src="imgSrc" style="margin: 0px 10px 5px; padding-top:10px;"></v-img>
            <hr style="height: 1.5px; background-color:black;">
            <v-card-title primary-title>
              <div style="width:100%;">
                <h3 class="headline mb-1">{{title}}</h3>
                <hr style="height:2.8px; background-color:#FFBA6C;">
                <div class="mt-2"><p v-html="body"></p></div>
              </div>
            </v-card-title>
          </v-card> -->
              <v-card>
                <v-img :src="imgSrc">
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <div><p v-html="body" style="font-size:1.24rem;"></p></div>
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
        <!-- go back button -->
        <v-flex xs12 text-xs-center round mb-5>
          <v-btn color="#DB4437" text-xs-center dark to="/portfolio">
            <v-icon size="25" class="mr-2">fa-file-text-o</v-icon>리스트로
          </v-btn>
          <v-btn color="none" text-xs-center dark to="/">
            <v-icon size="25" class="mr-2">fa-home</v-icon>홈으로
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
