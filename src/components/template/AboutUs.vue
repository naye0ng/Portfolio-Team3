<template>
    <v-layout justify-space-between fill-height align-center>
      <v-flex xs2  @mouseenter="hiddenMsg()" @mouseleave="originMsg()">
        <div style="color:rgba(255,255,255,0);" >EasterEgg</div>
      </v-flex>
      <v-flex mt2 xs8 text-xs-center>
        <p v-html="msg" class="aboutus-font">
        </p>
      </v-flex>
      <v-flex xs2></v-flex>
    </v-layout>
</template>

<script>
export default {
  name : 'AboutUs',
  data() {
    return {
      msg : '안녕하세요 <span class="aboutus-font-spotlight">TEAM 3</span> 입니다. <br/> ' +
      '저희는 <span class="aboutus-font-spotlight">협업</span>을 통해 팀 포트폴리오 블로그를 만들었고, <br/> ' +
      '개발 중 항상 <span class="aboutus-font-spotlight">서로의 의견을 존중</span>하고,<br/> 주어진 일을 해결함과 동시에 더 나은 결과를 위해 같이 고민합니다.<br/>' +
      '그럼 <span class="aboutus-font-spotlight">Enjoy!</span>'
    }
  },
  methods : {
    originMsg() {
      this.msg = '안녕하세요 <span class="aboutus-font-spotlight">TEAM 3</span> 입니다. <br/> ' +
      '저희는 <span class="aboutus-font-spotlight">협업</span>을 통해 팀 포트폴리오 블로그를 만들었고, <br/> ' +
      '개발 중 항상 <span class="aboutus-font-spotlight">서로의 의견을 존중</span>하고,<br/> 주어진 일을 해결함과 동시에 더 나은 결과를 위해 같이 고민합니다.<br/>' +
      '그럼 <span class="aboutus-font-spotlight">Enjoy!</span>';
    },
    hiddenMsg() {
      this.msg = '<span class="aboutus-font-spotlight">요정</span>과 <span class="aboutus-font-spotlight">그저빛</span> 그리고 3명의 쩌리들'
    }
  }
}
</script>

<style>
.aboutus-font {
  font-family: 'Jua', sans-serif;
  font-size: 1.2rem;
}
.aboutus-font-spotlight {
  font-size:1.4rem;
  color:#EC407A;
}
</style>
