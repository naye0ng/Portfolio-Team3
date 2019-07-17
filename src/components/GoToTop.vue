<template>
  <back-to-top bottom="50px" right="50px">
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
