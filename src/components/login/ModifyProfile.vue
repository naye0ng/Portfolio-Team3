<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button
          class="button button--wayra button--border-medium button--text-medium button--size-s"
          style="color:#fff"
          v-on="on"
        >프로필 수정</button>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" v-model="name" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="NickName" v-model="datanick" :placeholder="nickname"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Telephone" v-model="datatel" :placeholder="telephone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Biography" v-model="databio" :placeholder="biography"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card-actions>
                  <span class="body-1">당신은 <strong>{{showLevel}}</strong> 입니다.</span>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat v-if="accessLevel == 0" @click="upgradeAL">upgrade!</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat text @click="dialog = false">Close</v-btn>
          <v-btn color="primary" flat text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase"
import Swal from 'sweetalert2'

export default {
  name : "modifyProfile",
  props: {
    emailKey : { type : String },
    name : { type : String },
    email : { type : String },
    telephone : { type : String },
    biography : { type : String },
    accessLevel : { type : String },
    nickname : { type : String }
  },
  data: () => ({
      dialog: false,
      databio : "",
      datatel : "",
      datanick : "",
  }),
  methods : {
    save() {
      this.dialog = false;

      var ref = firebase.database().ref("user").child(this.emailKey);

      console.log(this.datatel + " " + this.databio + " " + this.datanick)

      if(this.datatel != "" || this.datatel != this.$store.getters.dbuser.telephone) {
        ref.child('telephone').set(this.datatel).then(data => {
          this.$store.commit("setDBUserTel", this.datatel);
        })
      }
      if(this.databio != "" || this.databio != this.$store.getters.dbuser.biography) {
        ref.child('biography').set(this.databio).then(data => {
          this.$store.commit("setDBUserBio", this.databio);
        })
      }
      if(this.datanick != "" || this.datanick != this.$store.getters.dbuser.nickname) {
        ref.child('nickname').set(this.datanick).then(data => {
          this.$store.commit("setDBUserNick", this.datanick);
        })
      }
    },
    upgradeAL() {
      var upgradeL = this.accessLevel == "0" ? "1" : "2"
      firebase
        .database()
        .ref("upgrade")
        .child(this.emailKey)
        .child("accessLevel")
        .set(upgradeL)
        .then(data => {
          console.log("등업요청 완료")
          Swal.fire({
            text: "등업 요청을 완료하였습니다. 곧 처리해드리겠습니다.",
            title: "Success!",
            type: 'success'
          })
        })
    }
  },
  computed : {
    showLevel() {
      return this.accessLevel == "0" ? '방문자' : this.accessLevel == "1" ? '팀원' : '어드민';
    }
  },
  mounted() {

  }
}
</script>
