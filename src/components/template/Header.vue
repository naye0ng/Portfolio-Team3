<template>
  <v-layout>
    <v-toolbar fixed id="header" style="z-index:999;">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <router-link to="/" exact style="text-decoration:none;">
        <v-toolbar-title>&nbsp;Hello Universe;</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items">
        <v-btn flat :to="item.to" active-class="primary">{{ item.title }}</v-btn>
      </v-toolbar-items>

      <!-- Login area -->
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- Login button -->
        <v-btn flat @click.stop="dialog = true" v-if="!user">LOGIN</v-btn>

        <!-- User image on Header -->
        <v-menu v-if="user" offset-y style="z-index:999;">
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-img
                contain
                max-width="40px"
                max-height="40px"
                :src="profile_image"
                style="border-radius:100%;"
                aspect-ratio="1"
              ></v-img>
            </v-btn>
          </template>

          <!-- Logout menu -->
          <v-list>
            <v-list-tile @click="dialog = true">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/profile">
              <v-list-tile-title style="color:black;">My Page</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin" v-if="isAdmin">
              <v-list-tile-title style="color:black;">Admin</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- Login or Logout modal -->
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card style="border-radius:20px; border-radius:0px;">
            <v-layout style="color:#ffffff; background-color:#ffffff;">
              <v-flex class="text-xs-right" style="color:#ffffff; background-color:#ffffff;">
                <v-btn small icon @click="dialog = false" style="margin-bottom:0px">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <Login></Login>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn icon @click="notify()">
          <v-icon>star</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- navigation area -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      fixed
      class="secondary"
      id="navigation-style"
    >
      <v-list class="px-1 pt-2">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon :color="getListTitleColor">favorite</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title style="color:#ffffff">{{getListTitleName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0 mb-1" dense>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          color="white"
          active-class="primary"
          light
          class="my-1"
        >
          <v-list-tile-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider class="grey darken-2 mx-2"></v-divider>
      <Visited></Visited>
      <v-divider class="grey darken-2 mx-2"></v-divider>
      <v-container py-0>
        <v-layout column>
          <v-flex xs12>
            <v-card flat>
              <WeatherDetail></WeatherDetail>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import Login from "@/components/login/Login";
import WeatherDetail from "@/components/template/WeatherDetail";
import Visited from "@/components/repository/Visited";
import { access } from 'fs';

export default {
  name: "main-header",
  data() {
    return {
      login_title: "LOGIN",
      drawer: null,
      dialog: false,
      items: [
        { title: "HOME", icon: "home", to: "/" },
        { title: "POST", icon: "web", to: "/post" },
        { title: "PORTFOLIO", icon: "border_color", to: "/portfolio" },
        { title: "TEAM3", icon: "group", to: "/team3" }
      ],
      profile_image: "",
      isAdmin : false,
    };
  },
  components: {
    Login,
    Visited,
    WeatherDetail
  },
  methods: {
    notify: function() {
      this.$swal({
        type: "info",
        title: "Notification",
        text: "우측 상단에 ☆을 눌러 즐겨찾기로 추가하세요!"
      });
    },
    getUsers() {
      // console.log(this.user.email.split('@')[0])
      var userKey = this.user.email.split('@')[0]
      firebase.database().ref().child("user").child(userKey).child("accessLevel").on("value", snapshot => {
        this.isAdmin = snapshot.val() == 2 ? true : false;
      })
      return false
    },
  },
  computed: {
    getListTitleColor() {
      if (this.$store.getters.getUser == null) {
        return "white";
      } else {
        return "primary";
      }
    },
    getListTitleName() {
      return this.$store.getters.dbuser.nickname;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    user() {
      if (this.$store.getters.getUser) {
        if (!this.$store.getters.getUser.photoURL) {
          this.profile_image = "https://i.stack.imgur.com/34AD2.jpg";
        } else {
          this.profile_image = this.$store.getters.getUser.photoURL;
        }
        // 로그인 완료시 관리자 체크
        this.getUsers()
      }
      this.dialog = false;
    }
  },
};
</script>
<style>
#header {
  background-color: #181818;
  box-shadow: 0 0 0 0;
}
#header * {
  color: #fff !important;
}
#navigation-style {
  position: fixed;
  z-index: 1000;
  overflow-y: hidden;
}
#navigation-style .theme--light.v-sheet {
  background-color: #181818 !important;
  color: white;
}

.v-btn--icon:before {
    background-color : transparent!important;
}
.v-btn:hover, .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
    background-color: rgba(1,1,1,0.5)!important;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: transparent!important;
}
#header .text-fff{
  color: #fff !important;
}
#header .v-btn:before {
    background-color: transparent!important;
}
</style>
