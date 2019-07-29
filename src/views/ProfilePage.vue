<template>
  <div class="stars portdetail">
    <!-- <div class="stars"> -->
    <div class="twinkling"></div>
    <v-layout justify-center row fill-height>
      <v-flex xs10 text-xs-center style="margin:auto 0px; padding:5vh;">
        <Profile ></Profile>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Profile from "../components/login/Profile";
import Firebase from "firebase";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: ""
    };
  },
  components: {
    Profile
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
