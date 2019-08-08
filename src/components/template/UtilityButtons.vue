<template>
<div>
  <back-to-top bottom="20px" right="90px">
    <v-btn fab dark color="primary">
      <v-icon dark>keyboard_arrow_up</v-icon>
    </v-btn>
  </back-to-top>
  <chat-bot></chat-bot>
</div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import ChatBot from './ChatBot.vue'

export default {
  name : "GoToTop",
  components : {
    BackToTop,
    ChatBot,
  }
}
</script>

