<template>
  <v-layout mt-5 wrap justify-center>
    <v-flex xs-11>
      <!-- <Portfolio class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
      ></Portfolio>-->
      <vueper-slides slide-image-inside="true" :visible-slides="3" :slide-ratio="1/4" :dragging-distance="70" arrows-outside bullets-outside :infinite="false">
        <vueper-slide v-for="i in portfolios.length" :key="i-1" :image="portfolios[i-1].img" :title="portfolios[i-1].title"
    :content="portfolios[i-1].body">
        </vueper-slide>
      </vueper-slides>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";
// import {VueperSlides, VueperSlide} from 'vueperslides';
// import 'vueperslides/dist/vueperslides.css'

export default {
  name: "PortList2",
  data() {
    return {
      portfolios: []
    };
  },
  components: {
    Portfolio,
    // VueperSlides, 
    // VueperSlide, 
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
.vueperslide__image {
  transform: scale(1.5) rotate(-10deg);
}
.vueperslides__bullet {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 16px;
  height: 16px;
}

.vueperslides__bullet--active {
  background-color: #EC407A;
}

.vueperslides__bullet span {
  display: block;
  color: #fff;
  font-size: 10px;
  opacity: 0.8;
}
</style>
