<template>
  <v-layout align-center justify-center row fill-height style="background-color:#000000;">
    <div class="stars portdetail"></div>
    <!-- <div class="stars"> -->
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div>
    <v-container class="mt-3" fluid>
      <div style="margin-top:90px;">
        <v-layout my-5 wrap justify-start row>
          <v-flex xs3 my-1>
            <v-layout wrap row justify-end id="profile-btns" >
              <v-flex xs10>
                <button
                  class="font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff; min-width:35%; max-width:35%; padding:1.5em 0.2em;margin-top:10px;"
                  :class="{'button-selected':isPage0()}"
                  v-on:click="toggle(0)"
                ><i class="fa fa-user"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff; min-width:35%; max-width:35%;padding:1.5em 0.2em;margin-top:8px;"
                  :class="{'button-selected':isPage1()}"
                  v-on:click="toggle(1)"
                ><i class="fa fa-bookmark"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff; min-width:35%; max-width:35%;padding:1.5em 0.2em;margin-top:8px;"
                  :class="{'button-selected':isPage2()}"
                  v-on:click="toggle(2)"
                ><i class="fa fa-image"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff; min-width:35%; max-width:35%;padding:1.5em 0.2em;margin-top:8px;"
                  :class="{'button-selected':isPage3()}"
                  v-on:click="toggle(3)"
                ><i class="fa fa-sticky-note"></i></button>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs7 my-5 style="margin:auto 0px;" :class="{'d-none':!isPage0()}">
            <v-layout justify-start>
              <Profile></Profile>
            </v-layout>
          </v-flex>
          <v-flex xs7 my-2 style="margin:auto 0px;" :class="{'d-none':!isPage1()}">
            <v-layout justify-start>
              <Bookmark
              :useremail="$store.getters.dbuser.email"
              :portfolios="portfolios"
              :posts="posts"></Bookmark>
            </v-layout>
          </v-flex>
          <v-flex xs7 my-2 style="margin:auto 0px;" :class="{'d-none':!isPage2()}">
            <v-layout justify-start>
              <MyPortfolios
              :useremail="$store.getters.dbuser.email"
              :portfolios="portfolios"></MyPortfolios>
            </v-layout>
          </v-flex>
          <v-flex xs7 my-2 style="margin:auto 0px;" :class="{'d-none':!isPage3()}">
            <v-layout justify-start>
              <MyPosts
              :useremail="$store.getters.dbuser.email"
              :posts="posts"></MyPosts>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import Profile from "../components/login/Profile";
import Bookmark from "../components/login/Bookmark";
import MyPortfolios from "../components/portfolio/MyPortfolios";
import MyPosts from "../components/post/MyPosts";
import Firebase from "firebase";
import FirebaseService from '@/services/FirebaseService'

export default {
  name: "ProfilePage",
  data() {
    return {
      user: "",
      page: 0,
      portfolios:[],
      posts:[],
    };
  },
  components: {
    Profile,
    Bookmark,
    MyPortfolios,
    MyPosts,
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
    this.getUserPortfolios();
    this.getUserPosts();
  },
  watch: {
    user: function(val) {
      if (!this.user) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    async getUserPortfolios(){
      this.portfolios = await FirebaseService.getPortfolios();
      // console.log(this.portfolios);
    },
    async getUserPosts(){
      this.posts = await FirebaseService.getPosts();
      // console.log(this.posts);
    },
    toggle(page) {
      this.page = page;
    },
    isPage0() {
      return this.page == 0 ? true : false;
    },
    isPage1() {
      return this.page == 1 ? true : false;
    },
    isPage2() {
      return this.page == 2 ? true : false;
    },
    isPage3() {
      return this.page == 3 ? true : false;
    }
  }
};
</script>

<style>
#toggle-btns {
  text-align: center;
}
.button.toggle-btn {
  color: black;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 550;
  background-color: #f5f5f5;
  border-radius: 0px !important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.button.toggle-btn:hover {
  color: #ffff;
  background-color: rgb(90, 90, 90);
}
.button-selected {
  color: #ffff !important;
  background-color: #ec407a !important;
}

.card-title {
  font-size: 1.3rem !important;
  width: 100%;
  text-align: center;
  letter-spacing: normal !important;
}
.result-num {
  font-size: 4.3rem !important;
  text-align: center;
  margin-bottom: 10px;
}

.font-icon i::before {
  font-size: 23px!important;
}

</style>