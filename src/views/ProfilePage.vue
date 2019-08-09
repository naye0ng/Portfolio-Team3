<template>
  <v-layout class="profile-bts" align-center justify-center row style="min-height:100vh!important;position:relative;">
    <div  :class="{'shooting-star':this.$store.state.isLoading,'shooting-star-2':!this.$store.state.isLoading}" class="v-fade">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="p p-1"></div>
      <div class="p2 p-2"></div>
      <div class="p3 p-3"></div>
      <v-container fluid fill-height style="min-height:100vh;" v-show="!this.$store.state.isLoading" class="v-fade mt-3" :class="{'hide':this.$store.state.isLoading}">
      <div style="margin-top:90px; min-width:100%">
        <v-layout my-5 wrap justify-start row>
          <v-flex xs1></v-flex>
          <v-flex xs2 my-1>
            <v-layout wrap row justify-end id="profile-btns" >
              <v-flex xs10>
                <button
                  class="nav-profile font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff;margin-top:10px;"
                  :class="{'button-selected':isPage0()}"
                  v-on:click="toggle(0)"
                ><i class="fa fa-user"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="nav-profile font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff;margin-top:8px;"
                  :class="{'button-selected':isPage1()}"
                  v-on:click="toggle(1)"
                ><i class="fa fa-bookmark"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="nav-profile font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff;margin-top:8px;"
                  :class="{'button-selected':isPage2()}"
                  v-on:click="toggle(2)"
                ><i class="fa fa-image"></i></button>
              </v-flex>
              <v-flex xs10>
                <button
                  class="nav-profile font-icon button button--wayra button--border-thin button--text-thin button--size-s"
                  style="color:#fff;margin-top:8px;"
                  :class="{'button-selected':isPage3()}"
                  v-on:click="toggle(3)"
                ><i class="fa fa-sticky-note"></i></button>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 my-2 ml-2 style="margin:auto 0px; min-height: 100vh;" :class="{'d-none':!isPage0()}">
            <v-layout justify-start>
              <Profile style="position: relative; width:100%;" class="v-fade"></Profile>
            </v-layout>
          </v-flex>
          <v-flex xs7 my-2 ml-2 style="margin:auto 0px; min-height: 100vh;" :class="{'d-none':!isPage1()}">
            <!-- <v-layout justify-start> -->
              <Bookmark
              :useremail="$store.getters.dbuser.email"
              :portfolios="portfolios"
              :posts="posts"
              style="position: relative; width:100%;" class="v-fade"></Bookmark>
            <!-- </v-layout> -->
          </v-flex>
          <v-flex xs7 my-2 ml-2 style="margin:auto 0px; min-height: 100vh;" :class="{'d-none':!isPage2()}">
            <!-- <v-layout justify-start> -->
              <MyPortfolios
              :useremail="$store.getters.dbuser.email"
              :portfolios="portfolios"
              style="position: relative; width:100%;" class="v-fade"></MyPortfolios>
            <!-- </v-layout> -->
          </v-flex>
          <v-flex xs7 my-2 ml-2 style="margin:auto 0px; min-height: 100vh;" :class="{'d-none':!isPage3()}">
            <!-- <v-layout justify-start> -->
              <MyPosts
              :useremail="$store.getters.dbuser.email"
              :posts="posts"
              style="position: relative; width:100%;" class="v-fade"></MyPosts>
            <!-- </v-layout> -->
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    </div>
    <SolarSystemLoading v-show="this.$store.state.isLoading" :class="{'hide':!this.$store.state.isLoading}" class="v-fade" ></SolarSystemLoading>
  </v-layout>
</template>
<script>
import Profile from "../components/login/Profile";
import Bookmark from "../components/login/Bookmark";
import MyPortfolios from "../components/portfolio/MyPortfolios";
import MyPosts from "../components/post/MyPosts";
import Firebase from "firebase";
import SolarSystemLoading from '../components/template/SolarSystemLoading'
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
    SolarSystemLoading,
    Bookmark,
    MyPortfolios,
    MyPosts,
  },
  beforeCreate(){
    this.$store.state.isLoading = true
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
        this.$router.push("/home");
      }
    }
  },
  methods: {
    async getUserPortfolios(){
      this.portfolios = await FirebaseService.getPortfolios();
    },
    async getUserPosts(){
      this.posts = await FirebaseService.getPosts();
      setTimeout(() => {
        this.$store.state.isLoading = false; 
      }, 1000);
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
.nav-profile{
  padding: 1em 0.2em;
  width: 60px!important;
  height: 60px!important;
  min-width: 60px; 
  max-width: 60px;
}
@media (max-width:700px) {
  .nav-profile{
    padding: 0.8em 0.2em;
    width: 50px!important;
    height: 50px!important;
    min-width: 50px; 
    max-width: 50px;
  }
  .font-icon i::before {
    font-size: 15px!important;
  }
}
</style>