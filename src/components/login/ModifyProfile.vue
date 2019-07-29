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
                <v-text-field label="Email" v-model="email" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Telephone" v-model="datatel" :placeholder="telephone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Biography" v-model="databio" :placeholder="biography"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Biography*" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase"

export default {
  name : "modifyProfile",
  props: {
    emailKey : { type : String },
    name : { type : String },
    email : { type : String },
    telephone : { type : String },
    biography : { type : String },
    accessLevel : { type : Number }
  },
  data: () => ({
      dialog: false,
      databio : "",
      datatel : "",
  }),
  methods : {
    save() {
      this.dialog = false;

      var ref = firebase.database().ref("user").child(this.emailKey);

      if(this.datatel != "") {
        ref.child('telephone').set(this.datatel).then(data => {
          this.$store.commit("setDBUserTel", this.datatel);
        })
      }
      if(this.databio != "") {
        ref.child('biography').set(this.databio).then(data => {
          this.$store.commit("setDBUserBio", this.databio);
        })
      }
    },
  },
  mounted() {
    this.databio = this.$store.getters.dbuser.biography;
    this.datatel = this.$store.getters.dbuser.telephone;
  }
}
</script>
