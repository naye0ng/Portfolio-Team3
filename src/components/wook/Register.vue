<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn round color="#181818" v-on="on" style="width:50%; color:#f7f7f7;">
          <v-icon size="25" class="mr-2">fa-user-plus</v-icon>회원가입
        </v-btn>
        <!-- <v-btn color="primary" dark v-on="on">회원가입</v-btn> -->
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">회원가입 작성</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="이메일(아이디)*" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="패스워드*"
                  v-model="password"
                  type="password"
                  required
                  hint="영문 숫자 특수문자조합 10글자 이상 필수"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="이름" v-model="name"></v-text-field>
              </v-flex>
              <br />
              <v-flex xs12 sm6>
                <v-select
                  :items="['가장 기억에 남는 장소는?', '초등학교 때 나의 별명은?', '가장 좋아하는 음식은?', '내가 어렸을 때 태어난 곳은?']"
                  label="비밀번호 찾기 질문*"
                  v-model="findPass"
                ></v-select>
              </v-flex>
              <v-flex sm6 md4>
                <v-text-field label="답변" v-model="answer" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="핸드폰번호" v-model="telephone" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*은 필수사항입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="SignUp()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import { Decipher } from "crypto";
import registerService from "../../services/wook/RegisterService";

export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      name: "",
      phoneNumber : "",
      findPass: "",
      answer: ""
    };
  },
  components: {
    registerService
  },
  methods: {
    SignUp() {
      const user = {
        email: this.email,
        password: this.password,
        findPass: this.findPass,
        name: this.name,
        answer: this.answer,
        telephone: this.telephone
      };
      this.dialog = false;
      user.password = registerService.Crypto(user.email, user.password);
      firebase
        .database()
        .ref("user")
        .push(user)
        .then(data => {
          console.log(data);
          commit("createdUser", user);
        })
        .catch(error => {
          console.log(error);
        });
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode+" : "+errorMessage);
        });
    }
  }
};
</script>