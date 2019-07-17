<template>
  <v-layout mt-5 wrap>
    <v-flex xs-12>
      <!-- <Portfolio class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
      ></Portfolio>-->
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortList2",
  data() {
    return {
      portfolios: []
    };
  },
  components: {
    Portfolio,
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
