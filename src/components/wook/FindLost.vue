<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <span style="color : #FE2E9A; font-style:italic; font-size:0.9em; cursor:pointer" v-on="on">Forgot password?</span>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">비밀번호 찾기</span>
        </v-card-title>
        <v-card-text>
          <v-container wrap justify-space-between align-center>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="이메일(아이디)*" v-model="email" :rules="emailRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select 
                  :items="['가장 기억에 남는 장소는?', '초등학교 때 나의 별명은?', '가장 좋아하는 음식은?', '내가 어렸을 때 태어난 곳은?']"
                  label="비밀번호 찾기 질문*"
                  v-model="findPass"
                  append-icon="expand_more"
                ></v-select>
              </v-flex>
              <v-flex sm6 md4>
                <v-text-field label="답변" v-model="answer" required :rules="findRules"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*은 필수사항입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="Find()">찾기<v-icon dark right>check_circle</v-icon></v-btn>
          <v-btn color="secondary" dark @click="dialog = false">닫기<v-icon dark right>block</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase' 
import { Decipher } from 'crypto'
import SendEmailService from '@/services/wook/SendEmailService'
import UpdatePasswordService from '@/services/wook/UpdatePasswordService'
import Swal from "sweetalert2";

export default{
    data (){      //v-text-field의 :rules 매칭, 비밀번호 찾기 시 입력 조건 체크
      return{
        dialog : false,
        password : '',
        email : '',
        findPass : '',
        answer : '',
      findRules : [v=> !!v || "이 부분은 필수 입력 사항입니다."],
      emailRules : [
        v => !!v || "이 부분은 필수 입력 사항입니다.",
        v =>  /.+@.+/.test(v) || "유효한 이메일만 가능합니다."
      ],
      }
    },
    methods : {
    Find() {
        var found;
        const user = {
          email : this.email,
          findPass : this.findPass,
          answer : this.answer,
        }
        var query=firebase.database().ref("user").orderByKey(); // Realtime-Database에서 user db를 추출해서
        query.once("value")                                     // 입력란과 user의 정보들이 모두 일치할 경우
          .then((snapshot)=> {                            // 해당 사용자 이메일로 비밀번호 재설정 링크를 보내줍니다.
            snapshot.forEach((childSnapshot)=> {   
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              if (user.email === childData.email){
                if (user.findPass === childData.findPass & user.answer === childData.answer){
                  SendEmailService.ResetEmail(user.email)
                  this.dialog=false;
                }
                else{
                  Swal.fire({
                    text: "비밀번호 정보 확인에 실패하였습니다",
                    type: "warning"
                  });
                }
                return true;
              }
            },
          );
        });
      }
    }
  }
</script>
