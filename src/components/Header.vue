<template>
  <v-layout>
    <v-toolbar fixed>
      <v-toolbar-side-icon class="hidden-md-and-up">
        <v-btn flat icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items">
        <v-btn flat :to="item.to">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.stop="dialog = true" v-if="!logged_in">{{login_title}}</v-btn>
        <v-menu v-if="logged_in" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-img
                contain
                max-width="40px"
                max-height="40px"
                :src="user.photoURL"
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
              v-if="!logged_in"
            >로그인</v-card-title>
            <v-card-title
              style="padding-top:0px;"
              class="headline justify-center"
              v-if="logged_in"
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
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar to="/">
          <v-list-tile-avatar>
            <v-icon color="pink">favorite</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon color="pink">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import SnsLogin from "@/components/haewon/SnsLogin";

export default {
  name: "main-header",
  data() {
    return {
      logged_in: "",
      user: "",
      login_title: "",
      drawer: null,
      dialog: false,
      items: [
        { title: "HOME", icon: "home", to: "/" },
        { title: "POST", icon: "web", to: "/post" },
        { title: "PORTFOLIO", icon: "border_color", to: "/portfolio" }
        // { title : 'LOGIN', icon : 'mood', to : 'login' }
      ]
    };
  },
  components: {
    SnsLogin
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
  mounted() {
    this.$loginBus.$on("loggedIn", l => {
      this.logged_in = l;
      this.user = FirebaseService.curUser();
      if (this.user && this.user.isAnonymous) {
        this.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
    });
  },
  watch: {
    logged_in: function(val) {
      if (val) {
        this.login_title = "LOGOUT";
        this.user = FirebaseService.curUser();
        if (this.user && this.user.isAnonymous) {
          this.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
        this.dialog = false;
      } else {
        this.login_title = "LOGIN";
        this.dialog = false;
        this.user = FirebaseService.curUser();
      }
    }
  }
};
</script>
