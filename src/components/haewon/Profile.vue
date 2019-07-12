<template>
  <v-layout justify-center>
    <v-card v-if="!isAno" max-height="500px" max-width="300px">
      <v-img :src="photoURL" aspect-ratio="1" width="300px" height="300px"></v-img>
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{displayName}}</h3>
      </v-card-title>
      <v-card-text>
        <div class="text-xs-left">{{email}}</div>
      </v-card-text>
    </v-card>
    <v-card v-if="isAno" width="300px">
      <v-card-title primary-title class="justify-center">
        <h3>익명 회원 공간</h3>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Firebase from "firebase";

export default {
  name: "SnsLogin",
  data() {
    return {
      user: "",
      photoURL: "",
      email: "",
      phoneNumber: "",
      displayName: "",
      isAno: ""
    };
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  watch: {
    user: function(val) {
      if (this.user) {
        this.isAno = this.user.isAnonymous;
      }
      if (this.user && !this.isAno) {
        this.displayName = this.user.displayName;
        this.email = this.user.email;
        this.photoURL = this.user.photoURL;
        this.phoneNumber = this.user.phoneNumber;
      }
    }
  }
};
</script>