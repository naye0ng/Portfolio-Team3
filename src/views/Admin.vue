<template>
<v-layout align-center justify-center row fill-height style="background-color:#fafafa;min-height:100vh" :class="{'height-100vh':this.$store.state.isLoading}">
<div class="shooting-star" style="position: relative;">
  <div class="stars"></div>
  <div class="tt twinkling"></div>
  <div class="p p-1"></div>
  <div class="p2 p-2"></div>
  <div class="p3 p-3"></div>
  <v-container id="admin" style="z-index:99" v-show="!this.$store.state.isLoading" class="v-fade" :class="{'hide':this.$store.state.isLoading}">
    <v-layout row wrap v-if="$store.getters.dbuser.accessLevel==2">
      <v-flex xs12 mt-5>
        <h2
          class="mt-3 pt-5 text-xs-center text-shadow homepage-title"
          style="color:#fff;font-size: 5rem;"
        >관리자 페이지</h2>
        <div id="toggle-btns" class="mt-2 mb-5">
          <button class="button toggle-btn" :class="{'button-selected':isPage0()}" v-on:click="toggle(0)">웹 로그</button>
          <button class="button toggle-btn" :class="{'button-selected':isPage1()}" v-on:click="toggle(1)">유저 권한 관리</button>
        </div>
      </v-flex>
      <v-flex xs12 :class="{'d-none':!isPage0()}">
        <AdminCount></AdminCount>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="$store.getters.dbuser.accessLevel==2" :class="{'d-none':!isPage1()}">
        <AdminTable></AdminTable>
    </v-layout>
    <v-layout
      row
      wrap
      align-center
      v-if="$store.getters.dbuser.accessLevel!=2"
      style="min-height:81.5vh;"
    >
      <v-flex xs12 mt-5>
        <h2
          class="mt-3 py-5 text-xs-center text-shadow homepage-title"
          style="color:#181818;font-size:4.3vw;"
        >당신은 관리자가 아니잖아!</h2>
      </v-flex>
    </v-layout>
  </v-container>
</div>
<SolarSystemLoading v-show="this.$store.state.isLoading" :class="{'hide':!this.$store.state.isLoading}" class="v-fade" ></SolarSystemLoading>
</v-layout>
</template>
<script>
import AdminCount from "../components/admin/AdminCount";
import AdminTable from "../components/admin/AdminTable";
import SolarSystemLoading from '../components/template/SolarSystemLoading'
import Firebase from "firebase";

export default {
  name: "Admin",
  components: {
    SolarSystemLoading,
    AdminCount,
    AdminTable,
  },
  data() {
    return {
      page : 1,
      user : ''
    }
  },
  methods: {
    toggle(page){
      this.page = page
    },
    isPage0(){
      return this.page == 0 ? true : false
    },
    isPage1(){
      return this.page == 1 ? true : false
    }
  },
  mounted() {
    this.$store.dispatch("checkUserStatus");
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
  beforeCreate(){
    this.$store.state.isLoading = true
  }
};
</script>
<style>
.tt{
  z-index: 0!important;
}
.layout.wrap {
  position: relative!important;
}
#toggle-btns {
  text-align: center;
}
.button.toggle-btn {
  color: black;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 550;
  background-color: #f5f5f5;
  border-radius: 55px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.button.toggle-btn:hover {
  background-color: #ddd;
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
#admin .v-card__title {
  padding-bottom: 0;
}
</style>