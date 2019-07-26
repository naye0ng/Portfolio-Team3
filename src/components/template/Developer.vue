<!-- 개발자의 개인적인 정보를 담은 컴포넌트 -->

<template>
  <div class="banner-images">
    <!-- 기본적으로 보여지는 부분 -->
    <v-avatar @click="showModal" size="12vw" class="interstella flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <v-img :aspect-ratio="16/9" :src="image"></v-img>
        </div>
        <div class="flip-card-back" :style="{'background-color':bgcolor}">
          <span class="dev-content">{{status}}</span>
        </div>
      </div>
    </v-avatar>

    <!-- 클릭 시 다이아로그 창 -->
    <v-layout row justify-center class="dev-dialog">
      <v-dialog v-model="dialog" max-width="700px">
        <v-card light>
          <v-layout column>
            <v-container py-0>
              <v-layout row>
                <v-flex xs5>
                  <v-img :src="image" width="100%" height="40vh"></v-img>
                </v-flex>
                <v-layout column px-3>
                  <v-card-title primary-title>
                    <div style="font-size:2vw;">
                      <i class="fa fa-angle-double-right fa-1x">&nbsp;</i>
                      <strong>{{name}}</strong>
                    </div>
                  </v-card-title>
                  <v-layout row align-center justify-center>
                    <div class="icon">
                      <i class="fa fa-quote-left" style="font-size:2vw;"></i>
                    </div>
                    <v-card-text class="text-xs-center" style="font-size:0.95vw;" px-0>
                      <span v-for="i in intro">
                        {{i}}
                        <br />
                      </span>
                    </v-card-text>
                    <div class="icon">
                      <i class="fa fa-quote-right" style="font-size:2vw;"></i>
                    </div>
                  </v-layout>
                  <v-layout row justify-space-around align-start style="padding-top:3vh;">
                    <i class="fa fa-github" style="font-size:3vw;" @click="openWindow(repo[0])"></i>
                    <i class="fa fa-at" style="font-size:3vw;" @click="openWindow(repo[1])"></i>
                    <i class="fa fa-instagram" style="font-size:3vw;" @click="openWindow(repo[2])"></i>
                    <i class="fa fa-envelope" style="font-size:3vw;" @click="show = !show"></i>
                  </v-layout>
                  <v-card-text>
                    <v-slide-y-transition>
                      <span v-show="show">{{email}}</span>
                    </v-slide-y-transition>
                  </v-card-text>
                </v-layout>
              </v-layout>
            </v-container>

            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex v-for="c in capa" :key="c.title" xs6>
                  <span><strong>{{c.title}}</strong></span>
                  <v-progress-linear :value="`${c.prog}`" :color="bgcolor"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Developer",
  props: {
    status: { type: String },
    name: { type: String },
    image: { type: String },
    intro: { type: Array },
    repo: { type: Array },
    email: { type: String },
    bgcolor: { type: String },
    capa: { type: Array }
  },
  data() {
    return {
      hover: false,
      dialog: false,
      show: false
    };
  },
  methods: {
    showModal() {
      this.dialog = true;
    },
    openWindow(url) {
      window.open(url);
    }
  }
};
</script>

<style>
.dev-content {
  font-size: 9vw;
  text-shadow: 0.05em 0px #ec407a;
}

.dev-frame {
  height: 100%;
  background-color: rgb(255, 255, 255, 0.3);
}

.icon {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
}

.banner-images {
  position: relative;
  z-index: 99;
}

@keyframes bingle {
  from {
  }
  to {
    transform: rotate(108000deg);
  }
}

.flip-card {
  background-color: transparent;
  animation-duration: 2000s;
  animation-name: bingle;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;

  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.flip-card:hover {
  animation-duration: 0s;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
}
.flip-card-front {
  background-color: rgba(255, 255, 255, 0.6);
}

.flip-card-back {
  color: white;
  transform: rotateY(180deg);
  /* line-height: 1rem; */
  position: relative;
}
.flip-card-back span {
  position: absolute;
  top: -7%;
  left: 30%;
}
</style>
