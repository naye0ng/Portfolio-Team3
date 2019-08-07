<template>
  <div id="chatbot" v-show="visible" class="v-fade">
    <v-menu top offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar color="primary" size="56" v-on="on" class="chatbot-avatar">
          <div class="icon-fairy"></div>
        </v-avatar>
      </template>
      <iframe src="https://app.closer.ai/webchat/Bdv8x4" id="chat-contain"></iframe>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data () {
    return {
      visible: false,
      visibleoffset : 600,
      visibleoffsetbottom : 0,
    }
  },
  mounted () {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll2)
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll2)
  },
  methods: {
    catchScroll2 () {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
    },
  },
}
</script>

<style>
#chatbot {
  position: fixed;
  bottom: 25px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
}
#chatbot .icon-fairy{
  width: 56px;
  height: 56px;
  content:'';
  position:absolute;
  background-size: cover;
  background-position: center center;
  background-image:url(../../assets/nana.png);
}
.v-btn:hover, .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover ,#chatbot .icon-fairy:hover{
  background-color: #181818!important;
}
.chatbot-avatar{
  overflow:hidden;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
}
#chat-contain {
  width: 350px;
  height: 500px;
  border-radius: 15px;
}
.v-menu__content--fixed {
  box-shadow:none!important;
}
</style>
