<template>

  <v-layout align-center justify-center row wrap white>
    <!-- google 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithGoogle" color="#df4a31" style="cursor:pointer;">
        <v-icon size="25" dark>fa-google</v-icon>
      </v-avatar>
    </v-flex>
    <!-- facebook 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithFacebook" color="#3C5A99" style="cursor:pointer;">
        <v-icon size="25" dark>fa-facebook</v-icon>
      </v-avatar>
    </v-flex>
    <!-- github 로그인 -->
    <v-flex xs3 text-xs-center class="mx-1">
      <v-avatar size="65" v-on:click="loginWithGithub" color="#4078c0" style="cursor:pointer;">
        <v-icon size="25" dark>fa-github</v-icon>
      </v-avatar>
    </v-flex>
    <v-flex xs12 pt-4 mt-1 pb-3>
      <hr style="height:0.9px; border:none; color:#D3D3D3; background-color:#D3D3D3; " />
    </v-flex>
  </v-layout>
</template>

<script>
import Firebase from "firebase";
import SnsService from "@/services/login/SnsService";

export default {
  name: "SnsLogin",
  components:{
    SnsService,
  },
  methods: {
    registerUserInfo(result) {
      var email = result.user.email;
      var displayName = result.user.displayName;
      var emailKey = email.split('@')[0];
      var ref = Firebase.database().ref("user");

      const user = {
        email: email,
        password: '',
        findPass: '',
        name: displayName,
        answer: '',
        telephone: '',
        nickName : displayName,
        accessLevel : "0" // 권한 부여 - 방문자
        //todo : 포토 박아주고 이름 맞추고
      };

      ref.once("value").then(snapshot => {
          var hasKey = snapshot.hasChild(emailKey);
          if(hasKey) {
            // 데이터베이스에 이미 존재하는 경우 => 소셜 로그인 시 vuex 저장
            this.$store.commit("setDBUser",snapshot.val()[emailKey]);
            // console.log(this.$store.getters.dbuser)
          } else {
            // 데이터베이스에 존재하지 않는 경우 - 처음 로그인 => user를 vuex 저장
            ref.child(emailKey) // key값 부여 - email의 앞부분
            .set(user)
            .then(data => {
              console.log("회원가입완료--db")
              this.$store.commit("setDBUser",user);
              // console.log(this.$store.getters.dbuser)
            })
            .catch(error => {
              console.log(error);
            });
          }
        })
    },
    async loginWithGoogle() {
      const result = await SnsService.loginWithGoogle();
      if (result){
        this.$store.commit("pushWebLog", "google");
        this.registerUserInfo(result);
      }
    },
    async loginWithFacebook() {
      const result = await SnsService.loginWithFacebook();
      if (result){
        this.$store.commit("pushWebLog", "facebook");
        this.registerUserInfo(result);
      }
    },
    async loginWithGithub() {
      const result = await SnsService.loginWithGithub();
      if (result){
        this.$store.commit("pushWebLog", "github");
        this.registerUserInfo(result);
      }
    }
  }
};
</script>
