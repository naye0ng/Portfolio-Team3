<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 align-center justify-center layout text-xs-center>
      <!-- User photo -->
      <v-avatar size="150" id="photophoto">
        <v-img :src="photoURL" aspect-ratio="1" width="150px" height="150px"></v-img>
      </v-avatar>
    </v-flex>

    <!-- User Info -->
    <v-flex xs12 justify-center text-xs-center id="profiledetail">
      <div class="mt-4">
        <h1 style="color:#f7f7f7; font-size:1.7em;">{{$store.getters.dbuser.nickname}}</h1>
        <span style="color:#f7f7f7; font-size:1.3em;">{{$store.getters.dbuser.email}}</span>
        <br />
        <span style="color:grey; font-size:1.1em;">{{$store.getters.dbuser.telephone}}</span>
        <br />
        <div class="mt-4 mb-4" style="color:#f7f7f7;">
          <span style="color:#f7f7f7; font-size:1.2em;">{{$store.getters.dbuser.biography}}</span>
        </div>

        <!-- Sns 계정 연동하기-->
        <v-layout align-center justify-center col mt-3 v-if="!linked" wrap>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 연동
            </v-btn>
            <v-btn color="#df4a31" outline v-on:click="linkwithSNS(1)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-google</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 연동
            </v-btn>
            <v-btn color="#3C5A99" outline v-on:click="linkwithSNS(2)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-facebook</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn color="#4078c0" outline v-on:click="linkwithSNS(3)" style="width:96%;" class="hidden-sm-and-down">
              <v-icon size="25" class="mr-2">fa-github</v-icon>Github 연동
            </v-btn>
            <v-btn color="#181818" outline v-on:click="linkwithSNS(3)" style="width:100%;" class="hidden-md-and-up">
              <v-icon size="25">fa-github</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <modifyProfile
          :emailKey="this.emailKey"
          :name="$store.getters.dbuser.name"
          :nickname="$store.getters.dbuser.nickname"
          :email="$store.getters.dbuser.email"
          :telephone="$store.getters.dbuser.telephone"
          :biography="$store.getters.dbuser.biography"
          :accessLevel="$store.getters.dbuser.accessLevel"
          :profile_image="$store.getters.dbuser.photoURL"
        ></modifyProfile>

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import SnsService from "@/services/login/SnsService";
import modifyProfile from "@/components/login/ModifyProfile"
import firebase from "firebase";

export default {
  name: "Profile",
  components : {
    modifyProfile
  },
  data() {
    return {
      photoURL: "https://i.stack.imgur.com/34AD2.jpg",
      dialog: false,
      linked : false,
      emailKey : "",
    };
  },
  methods: {
    async linkwithSNS(num) {
      var res = await SnsService.LinkSNS(num);
      this.$store.dispatch("checkUserStatus");
      this.dialog = false;
      if (res){
        this.linked = true;
      }
    },
    async setProfile() {
      var userFromDatabase = {}
      await firebase.auth().onAuthStateChanged(user => {
        // 현재 계정이 연결되어 있는지 확인 for 링크 버튼
        if(user && ((user.providerData.length > 1 && user.providerData[1].providerId == "password") ||
        (user.providerData.length == 1 && user.providerData[0].providerId != "password"))) {
          this.linked = true;
        }
        if (user){
          this.emailKey = user.email.split('@')[0];
        }
      });
    }
  },
  computed:{
    user() {
      if (this.$store.getters.getUser) {
        this.photoURL = this.$store.getters.dbuser.photoURL;
      }
      return this.$store.getters.getUser;
    },
  },
  created() {
    this.setProfile();
  },
  watch: {
    user() {
    }
  }
};
</script>
<style>
#photophoto,
#profiledetail {
  z-index: 99;
}
</style>
