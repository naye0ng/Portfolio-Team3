<template>
  <div class="stars portdetail">
    <!-- <div class="stars"> -->
    <div class="twinkling"></div>
    <v-layout justify-center row fill-height>
      <v-flex xs10 text-xs-center style="margin:auto 0px; padding:5vh;" v-show="!this.$store.state.isLoading" class="v-fade">
        <Profile class="v-fade"></Profile>
      </v-flex>
      <SolarSystemLoading v-show="this.$store.state.isLoading" class="v-fade"></SolarSystemLoading> 
    </v-layout>
  </div>
</template>

<script>
import Profile from "../components/login/Profile";
import Firebase from "firebase";
import SolarSystemLoading from '../components/template/solarSystemLoading'

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
