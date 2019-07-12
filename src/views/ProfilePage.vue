<template>
  <v-layout justify-center row fill-height>
    <v-flex xs10 text-xs-center style="margin-top:150px">
      <Profile></Profile>
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from "../components/haewon/Profile";
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
        this.$router.push('/')
      }
    }
  }
};
</script>
