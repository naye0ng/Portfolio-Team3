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
              :repo="member.repo"
              :email="member.email"/>
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
          img : "https://cdn1.imggmi.com/uploads/2019/7/11/9dffa34d21da9a1ff22b64acb748a3b2-full.png",
          intro : ['안녕하세요','그림쟁이 개발자입니다.', '그림은 못그려요'],
          repo :
            [
              'https://github.com/ahlim721/dna_railro',
              'https://hyunah030.tistory.com/',
              'https://www.instagram.com/hyunah_0_0'
            ],
          email : 'ahlim721@gmail.com'
        },
        {
          status : 'E',
          name : '김동욱',
          img : "https://cdn1.imggmi.com/uploads/2019/7/11/1abbab7b37505e946a530d1baca99ea9-full.png",
          intro : ['안녕하세요 김동욱입니다.','백엔드 개발을 가장 좋아하지만,', '요즘은 프론트에 꽂힌 개발자입니다.', '알고리즘 B형을 목표로 하고있습니다.'],
          repo :
            [
              'https://github.com/ehddnr8813/Algorithm',
              'https://blog.naver.com/ehddnr8813',
              'https://www.instagram.com/kdong1129'
            ],
          email : 'ehddnr8813@naver.com'
        },
        {
          status : 'A',
          name : '김나영',
          img : "https://cdn1.imggmi.com/uploads/2019/7/11/a6309555e65c8c59f1a77d48c80d1e5b-full.png",
          intro : ['안녕하세요 김나영입니다.', '작은 요정이죠'],
          repo :
            [
              'https://github.com/naye0ng/Grape-Theme',
              'https://naye0ng.github.io',
              'https://www.instagram.com/nayeong_ee'
            ],
          email : 'nayeong_e@naver.com'
        },
        {
          status : 'M',
          name : '박해원',
          img : "https://cdn1.imggmi.com/uploads/2019/7/11/ec1f48fbde8177df0b60a7f2599a4f67-full.png",
          intro : ['안녕하세여 해원이에여!', '망고패션스무디가 제일로 꿀맛!'],
          repo :
            [
              'https://github.com/hanaluana/deep_learning',
              'https://hanaluana.github.io/',
              'https://www.instagram.com/hanaluana'
            ],
          email : 'hanaluana23@gmail.com'
        },
        {
          status : '3',
          name : '조용범',
          img : "https://cdn1.imggmi.com/uploads/2019/7/11/0523d7317dfb0774f6dbb06a85ea08a6-full.png",
          intro : ['안녕하세요','주니어 개발자 조용범입니다.','3조의 RM을 맡고있습니다.'],
          repo :
            [
              'https://github.com/YongbeomJo/vscore-repo',
              'https://www.instagram.com/liveindive',
              'https://www.instagram.com/liveindive'
            ],
          email : 'jybtask@gmail.com'
        }
      ]
    }
  },
	components: {
    Developer
	},
}
</script>
