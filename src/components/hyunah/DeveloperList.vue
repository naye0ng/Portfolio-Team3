<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.6">
        <v-layout align-center justify-space-around row fill-height text-xs-center>
          <div v-for="member in members">
            <Developer :image="member.img" :status="member.status" :name="member.name"/>
          </div>
        </v-layout>
    </v-img>
  </div>
</template>


<script>
import Developer from '@/components/hyunah/Developer'

export default {
	name: 'DeveloperList',
	props: {
    imgSrc : ""
	},
  data() {
    return {
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
	components: {
    Developer
	},
}
</script>
