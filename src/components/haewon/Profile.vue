<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 align-center justify-center layout text-xs-center>
      <v-avatar size="150">
        <v-img :src="photoURL" aspect-ratio="1" width="150px" height="150px"></v-img>
      </v-avatar>
    </v-flex>
    <v-flex xs12 justify-center text-xs-center>
      <div class="mt-4">
        <h1>{{name}}</h1>
        <span class="grey--text">{{email}}</span>
        <br>
        <span class="grey--text">{{telephone}}</span>
        <br />
        <div class="mt-4">
          <h3>즐거운 인생</h3>
          <h3>어제도 개발 오늘도 개발</h3>
        </div>
        <v-layout align-center justify-center col mt-3 v-if="isemail" wrap>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn
              color="#df4a31"
              outline
              v-on:click="linkwithSNS(1)"
              style="width:96%;"
              class="hidden-sm-and-down"
            >
              <v-icon size="25" class="mr-2">fa-google</v-icon>Google 연동
            </v-btn>
            <v-btn
              color="#df4a31"
              outline
              v-on:click="linkwithSNS(1)"
              style="width:100%;"
              class="hidden-md-and-up"
            >
              <v-icon size="25">fa-google</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn
              color="#3C5A99"
              outline
              v-on:click="linkwithSNS(2)"
              style="width:96%;"
              class="hidden-sm-and-down"
            >
              <v-icon size="25" class="mr-2">fa-facebook</v-icon>Facebook 연동
            </v-btn>
            <v-btn
              color="#3C5A99"
              outline
              v-on:click="linkwithSNS(2)"
              style="width:100%;"
              class="hidden-md-and-up"
            >
              <v-icon size="25">fa-facebook</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 text-xs-center ml-1 mr-1>
            <v-btn
              color="#181818"
              outline
              v-on:click="linkwithSNS(3)"
              style="width:96%;"
              class="hidden-sm-and-down"
            >
              <v-icon size="25" class="mr-2">fa-github</v-icon>Github 연동
            </v-btn>
            <v-btn
              color="#181818"
              outline
              v-on:click="linkwithSNS(3)"
              style="width:100%;"
              class="hidden-md-and-up"
            >
              <v-icon size="25">fa-github</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase";

export default {
  name: "Profile",
  data() {
    return {
      photoURL: "",
      email: "",
      telephone: "",
      name: "",
      findPass: "",
      answer: "",
      isAno: "",
      isemail: false,
      dialog: false,
      curU: ""
    };
  },
  methods : {
    back(user){
      this.email=user.email;
      this.telephone=user.telephone;
      this.name=user.name;
      this.findPass=user.findPass;
      this.answer=user.answer;
    },
    async linkwithSNS(num) {
      var res = await FirebaseService.LinkSNS(num);
      this.dialog = false;
    }
  },
  mounted() {
    const user = {
      email: "asd",
      telephone: "",
      name: "",
      findPass: "",
      answer: ""
    };
    var query = firebase.database().ref("user").orderByKey();
    query.once("value").then(snapshot => {
      var curEmail = firebase.auth().currentUser.email;
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if (curEmail === childData.email) {
          user.email = childData.email;
          user.telephone = childData.telephone;
          user.name = childData.name;
          user.findPass = childData.findPass;
          user.answer = childData.answer;
        }
      });
      this.back(user);
    });
    if (this.curU) {
      this.isAno = this.curU.isAnonymous;
    }
    if (this.curU && !this.isAno) {
      this.photoURL = this.curU.photoURL;
      if (!this.photoURL) {
        this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
      }
    }
    if (!this.isemail) {
      this.name = this.curU.displayName;
      this.email = this.curU.email;
      console.log(this.email);
    }
    if (this.curU && this.isAno) {
      this.name = "Unknown";
      this.email = "unknown@ssafy.com";
      this.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
    }
  }
};
</script>