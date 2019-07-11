<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.6">
        <v-layout align-center justify-space-around row fill-height text-xs-center>
          <div v-for="member in members">
            <Developer
              :image="member.img"
              :status="member.status"
              :name="member.name"
              :intro="member.intro"
              :repo="member.repo"/>
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
          img : "http://openweathermap.org/img/wn/10d@2x.png",
          intro : '안녕하세요, 그림쟁이 개발자에여 그림은 못그려요',
          repo : 'https://github.com/ahlim721/dna_railro',
        },
        {
          status : 'E',
          name : '김동욱',
          img : "http://openweathermap.org/img/wn/01d@2x.png",
          intro : '안녕하세요 김동욱입니다. 백앤드 개발을 가장 좋아하지만 요즘은 프론트에 꽂힌 개발자입니다. 알고리즘 B형을 목표로 하고있습니다.',
          repo : 'https://github.com/ehddnr8813/Algorithm',
        },
        {
          status : 'A',
          name : '김나영',
          img : "http://openweathermap.org/img/wn/02d@2x.png",
          intro : '안녕하세요, 김나영입니다. 작은 요정이죠',
          repo : 'https://github.com/naye0ng/Grape-Theme',
        },
        {
          status : 'M',
          name : '박해원',
          img : "http://openweathermap.org/img/wn/02d@2x.png",
          intro : '안녕하세여 해원이에여! 망고패션스무디가 제일로 꿀맛!',
          repo : 'https://github.com/hanaluana/deep_learning',
        },
        {
          status : '3',
          name : '조용범',
          img : "http://openweathermap.org/img/wn/03d@2x.png",
          intro : '안녕하세요. 주니어 개발자 조용범입니다. 3조의 RM을 맡고있습니다.',
          repo : 'https://github.com/YongbeomJo/vscore-repo',
        }
      ]
    }
  },
	components: {
    Developer
	},
}
</script>
