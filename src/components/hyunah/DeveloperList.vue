<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.6"
           color="rgb(255,255,255,0.5)">
        <v-layout align-center justify-space-around row fill-height text-xs-center>
          <div v-for="member in members">
            <Developer
              :image="getImgUrl(member.img)"
              :status="member.status"
              :name="member.name"
              :intro="member.intro"
              :repo="member.repo"
              :email="member.email"
              :bgcolor="member.color"
              :capa="member.capa"/>
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
          img : "imageHA.png",
          intro : ['안녕하세요','그림쟁이 개발자입니다.', '그림은 못그려요'],
          repo :
            [
              'https://github.com/ahlim721/dna_railro',
              'https://hyunah030.tistory.com/',
              'https://www.instagram.com/hyunah_0_0'
            ],
          email : 'ahlim721@gmail.com',
          color : 'rgba(75,192,192,1)',
          capa : [
            {title : 'JAVA', prog: '90'},
            {title : 'PYTHON & Django', prog: '75'},
            {title : 'C++', prog: '80'},
            {title : 'Javascript', prog: '85'},
            {title : 'Vue', prog: '85'},
            {title : 'Algorithm', prog: '85'}
          ]
        },
        {
          status : 'E',
          name : '김동욱',
          img : "imageDU.png",
          intro : ['안녕하세요 김동욱입니다.','백엔드 개발을 가장 좋아하지만,', '요즘은 프론트에 꽂힌 개발자입니다.', '알고리즘 B형을 목표로 하고있습니다.'],
          repo :
            [
              'https://github.com/ehddnr8813/Algorithm',
              'https://blog.naver.com/ehddnr8813',
              'https://www.instagram.com/kdong1129'
            ],
          email : 'ehddnr8813@naver.com',
          color : 'rgb(54, 162, 235, 0.5)',
          capa : [
            {title : 'JAVA', prog: '90'},
            {title : 'C++', prog: '65'},
            {title : 'Javascript', prog: '85'},
            {title : 'Vue', prog: '85'},
            {title : 'MYSQL', prog: '85'},
            {title : 'Algorithm', prog: '90'}
          ]
        },
        {
          status : 'A',
          name : '김나영',
          img : "imageNY.png",
          intro : ['안녕하세요 김나영입니다.', '작은 요정이죠'],
          repo :
            [
              'https://github.com/naye0ng/Grape-Theme',
              'https://naye0ng.github.io',
              'https://www.instagram.com/nayeong_ee'
            ],
          email : 'nayeong_e@naver.com',
          color : 'rgb(255, 99, 132, 0.5)',
          capa : [
            {title : 'PYTHON & Django', prog: '80'},
            {title : 'Javascript & Jquery', prog: '65'},
            {title : 'HTML5', prog: '90'},
            {title : 'CSS3', prog: '90'},
            {title : 'Vue', prog: '65'},
            {title : 'Git', prog: '95'}
          ]
        },
        {
          status : 'M',
          name : '박해원',
          img : "imageHW.png",
          intro : ['안녕하세여 해원이에여!', '망고패션스무디가 제일로 꿀맛!'],
          repo :
            [
              'https://github.com/hanaluana/deep_learning',
              'https://hanaluana.github.io/',
              'https://www.instagram.com/hanaluana'
            ],
          email : 'hanaluana23@gmail.com',
          color : 'rgb(255,206,86,0.5)',
          capa : [
            {title : 'PYTHON', prog: '85'},
            {title : 'Javascript', prog: '75'},
            {title : 'Vue', prog: '75'},
            {title : 'Deep Learning', prog: '70'},
            {title : 'Algorithm', prog: '80'},
            {title : 'Git', prog: '95'}
          ]
        },
        {
          status : '3',
          name : '조용범',
          img : "imageYB.png",
          intro : ['안녕하세요','주니어 개발자 조용범입니다.','3조의 RM을 맡고있습니다.'],
          repo :
            [
              'https://github.com/YongbeomJo/vscore-repo',
              'https://www.instagram.com/liveindive',
              'https://www.instagram.com/liveindive'
            ],
          email : 'jybtask@gmail.com',
          color : 'rgb(153,102,255,0.5)',
          capa : [
            {title : 'JAVA', prog: '85'},
            {title : 'C++', prog: '55'},
            {title : 'Javascript', prog: '65'},
            {title : 'Vue', prog: '65'},
            {title : 'Spring', prog: '80'},
            {title : 'Algorithm', prog: '75'}
          ]
        }
      ]
    }
  },
	components: {
    Developer
	},
  methods : {
    getImgUrl(img) {
      return require('@/assets/' + img)
    }
  }
}
</script>
