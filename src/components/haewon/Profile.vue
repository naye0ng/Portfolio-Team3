<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3 v-if="!isAno">
      <v-card>
        <v-img :src="photoURL" aspect-ratio="1" width="300px"></v-img>
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{displayName}}</h3>
        </v-card-title>
        <v-card-text>
          <div class="text-xs-left">{{email}}</div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 v-if="isAno">
      <v-card>
        <v-card-title primary-title>
          <h3>익명 회원 공간</h3>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

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
    this.user = FirebaseService.curUser();
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
};
</script>