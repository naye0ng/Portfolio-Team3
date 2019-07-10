<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.6">
        <v-layout align-center justify-space-around row fill-height text-xs-center>
          <v-hover v-for="member in members">
            <v-avatar size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
              <v-img :aspect-ratio="16/9" :src="member.img">
                <div v-if="hover" class="display-3 dev-frame">
                  <span class="dev-content">{{member.status}}</span>
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
      hover : false,
      members : [
        {
          status : 'T',
          name : '임현아',
          img : "http://openweathermap.org/img/wn/10d@2x.png"
        },
        {
          status : 'E',
          name : '김동욱',
          img : "http://openweathermap.org/img/wn/01d@2x.png"
        },
        {
          status : 'A',
          name : '김나영',
          img : "http://openweathermap.org/img/wn/02d@2x.png"
        },
        {
          status : 'M',
          name : '박해원',
          img : "http://openweathermap.org/img/wn/02d@2x.png"
        },
        {
          status : '3',
          name : '조용범',
          img : "http://openweathermap.org/img/wn/03d@2x.png"
        }
      ]
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
