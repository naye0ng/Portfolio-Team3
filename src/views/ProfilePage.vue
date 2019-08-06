<template>
  <v-layout align-center justify-center row style="min-height:100vh!important;position:relative;">
    <div class="shooting-star">
      <div class="stars"></div>
      <div class="twinkling" style="z-index:0!important;"></div>
      <div class="p p-1"></div>
      <div class="p2 p-2"></div>
      <div class="p3 p-3"></div>
      <v-layout justify-center row fill-height style="min-height:100vh;"  v-show="!this.$store.state.isLoading" class="v-fade" :class="{'hide':this.$store.state.isLoading}">
       <v-flex style="padding-top:150px;" class="v-fade">
        <Profile style="position: relative;" class="v-fade"></Profile>
       </v-flex>
    </v-layout>
    </div>
    <SolarSystemLoading v-show="this.$store.state.isLoading" :class="{'hide':!this.$store.state.isLoading}" class="v-fade" ></SolarSystemLoading>
  </v-layout>
</template>
<script>
import Profile from "../components/login/Profile";
import Firebase from "firebase";
import SolarSystemLoading from '../components/template/SolarSystemLoading'

export default {
  name: "ProfilePage",
  data() {
    return {
      user: ""
    };
  },
  components: {
    Profile,
    SolarSystemLoading,
  },
  beforeCreate(){
    this.$store.state.isLoading = true
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  watch: {
    user: function(val) {
      if (!this.user) {
        this.$router.push("/");
      }
    }
  }
};
</script>
