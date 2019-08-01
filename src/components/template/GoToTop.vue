<template>
  <back-to-top bottom="20px" right="90px">
    <v-btn fab dark color="primary">
      <v-icon dark>keyboard_arrow_up</v-icon>
    </v-btn>
  </back-to-top>
</template>

<script>
import BackToTop from 'vue-backtotop'

export default {
  name : "GoToTop",
  components : {
    BackToTop
  }
}
</script>

<style>
.btn-to-top {

}
</style>
