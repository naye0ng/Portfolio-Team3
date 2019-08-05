<template>
  <v-layout align-center justify-center row fill-height style="background-color:#000000;">
    <div class="stars portdetail"></div>
    <!-- <div class="stars"> -->
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div> 
    <v-container class="mt-3">
      <v-layout my-5 wrap justify-center row>
        <v-flex xs2>
          <v-layout wrap justify-end row>
            <v-flex xs10>
              <button
              class="button button--wayra button--border-thin button--text-thin button--size-s"
              style="color:#fff; min-width:100%; max-width:100%;padding:0.3em 0.5em;margin-top:10px;"
              v-on="on"
              :class="{'button-selected':isPage0()}"
              v-on:click="toggle(0)"
              >My Profile</button>
              </v-flex>
              <v-flex xs10>
              <button
                class="button button--wayra button--border-thin button--text-thin button--size-s"
                style="color:#fff; min-width:100%; max-width:100%;padding:0.3em 0.5em;margin-top:8px;"
                v-on="on"
                :class="{'button-selected':isPage1()}"
                v-on:click="toggle(1)"
              >Bookmarks</button>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs10 text-xs-center style="margin:auto 0px;" :class="{'d-none':!isPage0()}">
          <Profile ></Profile>
        </v-flex>

        <v-flex xs10 :class="{'d-none':!isPage1()}" >
          <LikedPost></LikedPost>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
  
</template>

<script>
import Profile from "../components/login/Profile";
import Firebase from "firebase";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: "",
      page:0,
    };
  },
  components: {
    Profile
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  watch: {
    user: function(val) {
      if (!this.user) {
        this.$router.push("/");
      }
    }
  },
  methods:{
    toggle(page){
      this.page = page
    },
    isPage0(){
      return this.page == 0 ? true : false
    },
    isPage1(){
      return this.page == 1 ? true : false
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
  border-radius: 0px!important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.button.toggle-btn:hover {
  color: #ffff;
  background-color: rgb(90, 90, 90);
}
.button-selected{
  color: #ffff!important;
  background-color: #ec407a!important;
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
</style>
