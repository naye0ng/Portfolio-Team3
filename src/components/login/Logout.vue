<template>
  <v-container>
    <div class="body-1" style="margin-bottom:5vh;">😟 정말 로그아웃 하시겠어요? 😟</div>
    <v-btn color="primary" dark v-on:click="logout" style="width:80%;">
      <v-icon size="25" class="mr-2">fa-sign-out</v-icon>로그아웃
    </v-btn>
  </v-container>
</template>

<script>
import LoginService from "@/services/login/LoginService";
import Firebase from "firebase";

export default {
  name: "Logout",
  methods: {
    async logout() {
      const result = await LoginService.logout();
      // this.$store.state.user = null;
      this.$store.commit('LOGOUT');
    }
  }
};
</script>
