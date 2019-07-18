
<template>
  <v-layout>
    <v-toolbar fixed id="header" style="z-index:999;">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <router-link to="/" exact style="text-decoration:none;"><v-toolbar-title>&nbsp;Hello Universe;</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items">
        <v-btn flat :to="item.to">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.stop="dialog = true" v-if="!$store.state.user">{{login_title}}</v-btn>
        <v-menu v-if="$store.state.user" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-img
                contain
                max-width="40px"
                max-height="40px"
                :src="$store.state.user.photoURL"
                style="border-radius:100%;"
                aspect-ratio="1"
              ></v-img>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile @click="dialog = true">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/profile">
              <v-list-tile-title style="color:black;">My Page</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-dialog v-model="dialog" max-width="400">
          <v-card style="border-radius:20px;">
            <v-flex class="text-xs-right">
              <v-btn small icon @click="dialog = false" style="margin-bottom:0px">
                  <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
            <v-card-title
              style="padding-top:0px;"
              class="headline justify-center"
              v-if="!$store.state.user"
            >로그인</v-card-title>
            <v-card-title
              style="padding-top:0px;"
              class="headline justify-center"
              v-if="$store.state.user"
            >로그아웃</v-card-title>
            <SnsLogin></SnsLogin>
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
    <v-navigation-drawer v-model="drawer" absolute temporary fixed class="grey lighten-5" id="navigation-style">
      <v-list class="pa-1 white navigation-list">
        <v-list-tile avatar to="/">
          <v-list-tile-avatar>
            <v-icon color="primary">favorite</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title style="color:#181818"><!-- insert user name -->Universe</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0 white navigation-list" dense>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon color="secondary">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title style="color:#181818">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <Visited ></Visited>
      <v-container>
        <v-layout column>
          <v-flex xs12>
            <v-card>
              <WeatherDetail></WeatherDetail>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import SnsLogin from "@/components/haewon/SnsLogin";
import WeatherDetail from "@/components/hyunah/WeatherDetail";
import Visited from './nayeong/Visited.vue'
import BackToTop from 'vue-backtotop'

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
        { title: "TEAM3", icon: "group", to: "/team3" },
        // { title : 'LOGIN', icon : 'mood', to : 'login' }
      ]
    };
  },
  components: {
    SnsLogin,
    Visited,
    BackToTop,
    WeatherDetail
  },
  methods: {
    notify: function() {
      this.$swal({
        type: "info",
        title: "Notification",
        text: "우측 상단에 ☆을 눌러 즐겨찾기로 추가하세요!"
      });
    }
  },
  computed:{
    userState(){
      return this.$store.state.user;
    }
  },
  watch:{
    userState(){
      this.dialog=false;
    }
  }
};
</script>
<style>
#header{
  background-color: #181818;
  box-shadow: 0 0 0 0;
}
#header *{
  color: #fff!important;
}
#navigation-style {
  position:fixed;
  z-index:1000;
}
</style>
