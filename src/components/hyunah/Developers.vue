<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.6">
        <v-layout align-center justify-space-around row fill-height text-xs-center>
          <v-hover>
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" src="http://openweathermap.org/img/wn/10d@2x.png">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">T</span>
                </div>
              </v-img>
            </v-avatar>
          </v-hover>
          <v-hover>
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" src="http://openweathermap.org/img/wn/01d@2x.png">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">E</span>
                </div>
              </v-img>
            </v-avatar>
          </v-hover>
          <v-hover>
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" src="http://openweathermap.org/img/wn/02d@2x.png">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">A</span>
                </div>
              </v-img>
            </v-avatar>
          </v-hover>
          <v-hover>
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" src="http://openweathermap.org/img/wn/03d@2x.png">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">M</span>
                </div>
              </v-img>
            </v-avatar>
          </v-hover>
          <v-hover>
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" src="http://openweathermap.org/img/wn/04d@2x.png">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">3</span>
                </div>
              </v-img>
            </v-avatar>
          </v-hover>
        </v-layout>
    </v-img>
  </div>
</template>


<script>

export default {
	name: 'Developers',
	props: {
    imgSrc : ""
	},
  data() {
    return {
      hover : false
    }
  },
	methods: {
	},
}
</script>
<style>

.dev-content {
  font-size:9vw;
}

.dev-frame {
  height: 100%;
  background-color: rgb(255, 255, 255, 0.3);
}

</style>
