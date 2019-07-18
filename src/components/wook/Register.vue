<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }" >
        <v-btn color="#181818" v-on="on" style="width:90%; color:#f7f7f7;">
          <v-icon size="25" class="mr-2">fa-user-plus</v-icon>회원가입
        </v-btn>
        <!-- <div class="bg-4">
          <button v-on="on" class="button button--wayra2 button--border-thin button--text-thin button--size-xs" 
            style="min-width:110px; max-width:110px;padding:0.3em 0.5em;margin:0;">
              회원가입
          </button> -->
        <!-- </div> -->
        <!-- <v-btn color="primary" dark v-on="on">회원가입</v-btn> -->
      </template>
      <v-card>
        <v-card-title >
          <span class="headline" style="text-align:center; width:100%">회원가입 작성</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap justify-space-between align-center>
              <v-flex xs2>
                <v-icon size="30" color="secondary">mail</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field label="이메일(아이디)*" v-model="email" required :rules="emailRules"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-icon size="30" color="secondary">lock</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  label="패스워드*"
                  v-model="password"
                  type="password"
                  required
                  hint="특수문자는 필수 포함 10글자 이상"
                  :rules="passwordRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                  <v-icon size="30" color="secondary">perm_identity</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field label="이름" v-model="name"></v-text-field>
              </v-flex>
              <br/>
                  <v-flex sm2>
                    <v-icon size="30" color="secondary">question_answer</v-icon>
                  </v-flex>
                 <v-flex sm7 d-flex>
                  <v-select
                    :items="['가장 기억에 남는 장소는?', '초등학교 때 나의 별명은?', '가장 좋아하는 음식은?', '내가 어렸을 때 태어난 곳은?']"
                    label="비밀번호 찾기 질문*"
                    v-model="findPass" append-icon="expand_more"
                  ></v-select>
                  </v-flex>
              <v-flex sm3>
                <v-text-field label="답변" v-model="answer" required :rules="loginRules"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-icon size="30" color="secondary">phone_in_talk</v-icon>
              </v-flex>
              <v-flex xs10>
                <v-text-field label="핸드폰번호" v-model="telephone" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*은 필수사항입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="SignUp()">Save<v-icon dark right>check_circle</v-icon></v-btn>
          <v-btn color="secondary" dark @click="dialog = false">Close<v-icon dark right>block</v-icon></v-btn>
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
      loginRules : [v=> !!v || "이 부분은 필수 입력 사항입니다."],
      emailRules : [
        v => !!v || "이 부분은 필수 입력 사항입니다.",
        v =>  /.+@.+/.test(v) || "유효한 이메일만 가능합니다."
      ],
      passwordRules : [
        v => !!v || "이 부분은 필수 입력 사항입니다.",
        v => v.length>=10 || "비밀번호는 10자리 이상입니다.",
        v => v.includes('!') || v.includes('@') || v.includes('#') || v.includes('$') || v.includes('%') || v.includes('^') || v.includes('&') || v.includes('*') || v.includes('(') || v.includes(')') || "특수기호는 필수입니다."
      ],
      dialog: false,
      email: "",
      password: "",
      name: "",
      telephone : "",
      findPass: "",
      answer: ""
    };
  },
  components: {
    registerService
  },
  computed : {

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
