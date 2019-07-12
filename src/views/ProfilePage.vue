<template>
<<<<<<< HEAD
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10 text-xs-center>
=======
  <v-layout justify-center row fill-height>
    <v-flex xs10 text-xs-center style="margin-top:150px">
>>>>>>> e47f10bf265463fe3c2cc048c4a29f55557dd4f2
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
