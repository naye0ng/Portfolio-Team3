<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img :src="photoURL" min-height="200px" max-height="300px"></v-img>
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{displayName}}</h3>
          <div>{{providerId}}</div>
        </v-card-title>
        <v-card-text>
          <div>{{email}}</div>
        </v-card-text>
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
      displayName: ""
    };
  },
  mounted() {
    this.user = FirebaseService.curUser();
    var profile = this.user.providerData[0];

    this.providerId = profile.providerId;
    this.displayName = profile.displayName;
    this.email = profile.email;
    this.photoURL = profile.photoURL;
    this.phoneNumber = profile.phoneNumber;
  }
};
</script>