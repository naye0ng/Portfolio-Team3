import firebase from 'firebase'
import Swal from 'sweetalert2'
import FirebaseService from '@/services/FirebaseService'

export default {
  loginUser(email, password) {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          var errorCode = error.code;
          if (errorCode === 'auth/wrong-password') {
            Swal.fire({
              title: 'Error!',
              text: '비밀번호가 틀렸습니다.',
              type: 'error'
            })
          } else if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
            Swal.fire({
              title: 'Error!',
              text: '해당 이메일로 가입된 사용자가 존재하지 않습니다.',
              type: 'error'
            })
          }
        });
      }
    )
  },
  LoginSuccess() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        Swal.fire({
          text: "로그인에 성공하셨습니다!",
          type: 'success'
        })
        FirebaseService.getPushPermission(user.email)
        return user;
      } else {
      }
    });
  },
  loginAnno() {
    return firebase.auth().signInAnonymously().catch(function (error) {
      Swal.fire({
        text:error.message,
        type:'warning'
      })
    });
  },
  logout() {
    return firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      console.error(error);
    });
  },
}