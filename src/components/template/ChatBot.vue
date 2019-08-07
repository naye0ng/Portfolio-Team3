<template>
  <div id="chatbot">
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
    name : "ChatBot"
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
