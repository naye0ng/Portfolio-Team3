<template>
  <div id="chatbot" v-show="visible" class="v-fade">
    <v-menu top offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar color="primary" size="56" v-on="on">
          <v-icon fab dark size="30" color="white">help_outline</v-icon>
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
      visible: true,
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
}

#chat-contain {
  width: 350px;
  height: 500px;
  border-radius: 15px;
}
</style>
