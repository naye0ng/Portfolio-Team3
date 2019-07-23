import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'

import firebase from "firebase";

Vue.use(Vuex)

const state = {
  accessToken: '',
  user: null,
  key : localStorage.getItem('log_key'),
  date : localStorage.getItem('log_date'),
  weather : {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  state: {
		accessToken: '',
    user: null,
    key : localStorage.getItem('log_key'),
    date : localStorage.getItem('log_date'),
    weather : {
      temp : '',
      temp : '',
      tempMin : '',
      tempMax : '',
      icon : '',
      desc : '',
      hum : ''
    }
  },
  getters:{
    // 유저 반환
    getUser: function(state){
      return state.user;
    }
  },
  actions:{
    // User 상태 계속 확인해서, 유저 업데이트 해주기
    checkUserStatus({commit,state}){
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('SET_USER', user);
            resolve(user);
          }
        });
      });
    },
  },
  mutations:{
    pushWebLog(state, social){
      var ref = firebase.database().ref()
      ref.child("logs").child(state.date).child(state.key).child('user').set(state.user.email);
      var socialCount =  0
      ref.child("social").child(social).on('value', (snapshot)=>{
        socialCount =  snapshot.val() || 0
      });
      ref.child("social").child(social).set(socialCount+1)
    },
    setWeather(state, payload) {
      // weather를 set하는 함수.
      state.weather = payload
    }
    // User 바꿔주기
    SET_USER(state,user){
      state.user = user;
      if (state.user){
        if (state.user.isAnonymous){
          state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
        else if (!state.user.photoURL){
          state.user.photoURL = "https://i.stack.imgur.com/34AD2.jpg";
        }
      }
    },
    // 로그아웃
    LOGOUT(state) {
      state.user = null;
    },
  }
})
