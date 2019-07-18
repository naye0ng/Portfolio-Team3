<template>
  <div class="banner-images">
    <v-hover>
      <v-avatar @click="showModal" size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.6)" class="interstella">
        <v-img :aspect-ratio="16/9" :src="image">
          <div v-if="hover" class="display-3 dev-frame">
            <span class="dev-content">{{status}}</span>
          </div>
        </v-img>
      </v-avatar>
    </v-hover>

    <v-layout row justify-center class="dev-dialog">
      <v-dialog v-model="dialog" width="650">
        <v-card light>
          <v-layout column>
            <v-layout row>
              <v-flex xs5>
                <v-img :src="image" height="300px" width="auto"></v-img>
              </v-flex>
              <v-layout column>
                <v-card-title primary-title>
                  <div class="headline">
                    <i class="fa fa-angle-double-right fa-1x">&nbsp;</i>
                    <strong>{{name}}</strong>
                  </div>
                </v-card-title>
                <v-layout row align-center>
                  <div class="icon">
                    <i class="fa fa-quote-left fa-2x"></i>
                  </div>
                  <v-card-text>
                    <span v-for="i in intro">
                      {{i}}<br>
                    </span>
                  </v-card-text>
                  <div class="icon">
                    <i class="fa fa-quote-right fa-2x"></i>
                  </div>
                </v-layout>
                <v-layout row justify-space-around align-start style="padding-top:3vh;">
                  <i class="fa fa-github fa-3x" @click="openWindow(repo[0])"></i>
                  <i class="fa fa-at fa-3x" @click="openWindow(repo[1])"></i>
                  <i class="fa fa-instagram fa-3x" @click="openWindow(repo[2])"></i>
                  <i class="fa fa-envelope fa-3x" @click="show = !show"></i>
                </v-layout>
                <v-card-text>
                  <v-slide-y-transition>
                    <span v-show="show">{{email}}</span>
                  </v-slide-y-transition>
                </v-card-text>
              </v-layout>
            </v-layout>
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex v-for="c in capa" xs6>
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
  name : 'Developer',
  props : {
    status : {type: String},
    name : {type: String},
    image : {type: String},
    intro : {type: Array},
    repo : {type: Array},
    email : {type: String},
    bgcolor : {type: String},
    capa : {type: Array}
  },
  data() {
    return {
      hover: false,
      dialog: false,
      show: false
    }
  },
  methods : {
    showModal() {
      this.dialog = true;
    },
    openWindow(url) {
      window.open(url);
    }
  }
}
</script>

<style>

.dev-content {
  font-size:9vw;
  text-shadow: 4px 0px #EC407A
}

.dev-frame {
  height: 100%;
  background-color: rgb(255, 255, 255, 0.3);
}

.icon {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
}

.banner-images{
  position: relative;
  z-index : 99;
}

.interstella {
   animation-duration: 1500s;
   animation-name: bingle;
}
@keyframes bingle {
   from {
   }
   to {
       transform : rotate(108000deg);
   }
}

</style>
