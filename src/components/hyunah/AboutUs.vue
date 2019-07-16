<template>
    <v-layout justify-space-between fill-height align-center>
      <v-flex xs2  @mouseenter="hiddenMsg()" @mouseleave="originMsg()">
        <div style="color:rgba(255,255,255,0);" >EasterEgg</div>
      </v-flex>
      <v-flex mt2 xs8 text-xs-center>
        <p v-html="msg" class="body-1">
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
      msg : '안녕하세요 SSAFY 3조 입니다. <br/> 팀 블로그에 방문해주셔서 감사합니다. <br/> ' +
      '저희는 협업을 통해 팀 포트폴리오 블로그를 만들었고, <br/> 개발 과정을 JIRA와 GITLAB에 기록했습니다.<br/>' +
      '개발 중 항상 서로의 의견을 존중하고,<br/> 주어진 일을 해결함과 동시에 더 나은 결과를 위해 같이 고민합니다.<br/>' +
      '또한 각자 개발자로서의 인적, 프로그래밍적 역량을 갖추기 위해 노력하고 있습니다.'
    }
  },
  methods : {
    originMsg() {
      this.msg =  '안녕하세요 SSAFY 3조 입니다. <br/> 팀 블로그에 방문해주셔서 감사합니다. <br/> ' +
      '저희는 협업을 통해 팀 포트폴리오 블로그를 만들었고, <br/> 개발 과정을 JIRA와 GITLAB에 기록했습니다.<br/>' +
      '개발 중 항상 서로의 의견을 존중하고,<br/> 주어진 일을 해결함과 동시에 더 나은 결과를 위해 같이 고민합니다.<br/>' +
      '또한 각자 개발자로서의 인적, 프로그래밍적 역량을 갖추기 위해 노력하고 있습니다.';
    },
    hiddenMsg() {
      this.msg = '요정과 그저빛과 3명의 쩌리들'
    }
  }
}
</script>
