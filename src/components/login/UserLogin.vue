<template>
  <v-layout row justify-center>
    <br style="width:2px;color:black;" />
    <v-flex xs12 justify-center text-xs-center class="bg-1 ml-2 pr-4">
      <v-text-field prepend-icon="person" v-model="email" label="Email" type="text" class="pr-2"></v-text-field>
      <v-text-field
        prepend-icon="lock"
        v-model="password"
        label="Password"
        id="password"
        type="password"
        class="pr-2"
      ></v-text-field>
      <v-btn color="primary" @click="Login()" dark style="width:87%;" class="ml-4">
        <v-icon size="25" class="mr-2">fa-user</v-icon>회원 로그인
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import LoginService from "@/services/login/LoginService";
import registerService from "@/services/login/RegisterService";
import UpdatePassword from "@/services/login/UpdatePasswordService"

export default {
  data() {
    return {
      drawer: null,
      dialog2: false,
      email: "",
      password: ""
    };
  },
  methods: {
    async Login() {
      const user = {
        email: this.email,
        password: this.password,
        name: "",
        phoneNumber: "",
        findPass: "",
        answer: ""
      };
      // user.password=registerService.Crypto(user.email,user.password);
      const result = await LoginService.loginUser(user.email, user.password);
      this.dialog2 = false;
      if (result) {
       UpdatePassword.Update(user.email);
        this.$store.commit('SET_USER',result.user);
        this.$store.commit("pushWebLog", "email");
        LoginService.LoginSuccess();
      }
    }
  }
};
</script>
