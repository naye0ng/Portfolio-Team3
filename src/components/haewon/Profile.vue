<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3 v-if="!isAno">
      <v-card>
        <v-img :src="photoURL" min-height="200px" max-height="300px"></v-img>
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
      providerId: "",
      displayName: "",
      isAno: false
    };
  },
  mounted() {
    this.user = FirebaseService.curUser();

    this.isAno = this.user.isAnonymous;

    if (!this.isAno) {
      var profile = this.user.providerData[0];
      this.providerId = profile.providerId;
      this.displayName = profile.displayName;
      this.email = profile.email;
      this.photoURL = profile.photoURL;
      this.phoneNumber = profile.phoneNumber;
    }
  }
};
</script>