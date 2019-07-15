<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn round color="#4078c0" v-on="on" style="width:50%; color:#f7f7f7;">
          <v-icon size="25" class="mr-2">fa-user</v-icon>회원 로그인
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12 sm6>
            <v-text-field prepend-icon="person" v-model="email" label="Login" type="text"></v-text-field>
            <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="Login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
import firebase from 'firebase'
import firebaseService from '../../services/FirebaseService';
import registerService from '../../services/wook/RegisterService';

export default {
  data(){
    return{
      drawer: null,
      dialog2 : false,
      email: "",
      password:""
    }
  },
  components : {
    firebaseService,
    registerService
  },
  methods : {
    Login(){
      const user={
        email: this.email,
        password: this.password
      }
      user.password=registerService.Decrpyto(user.password);
      firebaseService.loginUser(user.email, user.password);
      this.dialog2=false;
      firebaseService.LoginSuccess();
    }
  }
};
</script>
