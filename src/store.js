import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
    user: null,
    key : localStorage.getItem('log_key'),
    date : localStorage.getItem('log_date'),
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
    }
  }
})
