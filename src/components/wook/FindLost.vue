<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <span style="color : #FE2E9A"  v-on="on">비번번호 찾기</span>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">비밀번호 찾기</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="이메일(아이디)*" v-model="email"></v-text-field>
              </v-flex>
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
            </v-layout>
          </v-container>
          <small>*은 필수사항입니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" flat @click="Find()">찾기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase' 
import { Decipher } from 'crypto'
import FirebaseService from '../../services/FirebaseService'
import registerService from '../../services/wook/RegisterService'
import SendEmailService from '@/services/wook/SendEmailService'


export default{
    data (){
      return{
        dialog : false,
        password : '',
        email : '',
        findPass : '',
        answer : '',
      }
    },
    components : {
      FirebaseService,
      registerService,
      SendEmailService
    },
    methods : {
      Find() {
        var found;
        const user = {
          email : this.email,
          findPass : this.findPass,
          answer : this.answer
        }
        this.dialog=false;
        var query=firebase.database().ref("user").orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) { 
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              var before;
              if(user.email===childData.email && user.findPass===childData.findPass&& user.answer===childData.answer ){
                before=(childData.password);
                user.answer=registerService.Decrpyto(user.email, before);
                SendEmailService.ResetEmail(user.email);
                return true;
              }
          });
        });
      }
    }
  }
</script>