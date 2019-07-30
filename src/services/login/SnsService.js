import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  loginWithGoogle() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        let provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithPopup(provider)
          .catch(function (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
              Swal.fire({
                text: "이미 해당 이메일과 연동된 계정이 있습니다.",
                type: 'warning'
              })
            }
            else{
              Swal.fire({
                text: error.message,
                type: 'warning'
              })
            }
          })
      })
  },
  loginWithFacebook() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        let provider = new firebase.auth.FacebookAuthProvider()
        return firebase.auth().signInWithPopup(provider)
          .catch(function (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
              Swal.fire({
                text: "이미 해당 이메일과 연동된 계정이 있습니다.",
                type: 'warning'
              })
            }
            else{
              Swal.fire({
                text: error.message,
                type: 'warning'
              })
            }
          })
      })
  },
  loginWithGithub() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        let provider = new firebase.auth.GithubAuthProvider()
        return firebase.auth().signInWithPopup(provider)
          .catch(function (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
              Swal.fire({
                text: "이미 해당 이메일과 연동된 계정이 있습니다.",
                type: 'warning'
              })
            }
            else{
              Swal.fire({
                text: error.message,
                type: 'warning'
              })
            }
          })
      })
  },
  LinkSNS(num) {
    if (num == 1) {
      var provider = new firebase.auth.GoogleAuthProvider();
    } else if (num == 2) {
      var provider = new firebase.auth.FacebookAuthProvider();
    } else {
      var provider = new firebase.auth.GithubAuthProvider();
    }
    return firebase.auth().currentUser.linkWithPopup(provider).then(function (result) {
      var credential = result.credential;
      var user = result.user;
      return user
    }).catch(function (error) {
      var errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        Swal.fire({
          text: '이미 다른 이메일에 연결된 계정입니다',
          type: 'warning'
        })
      }
      else if (errorCode === 'auth/credential-already-in-use') {
        Swal.fire({
          text: '이미 SNS 로그인에 등록된 계정입니다',
          type: 'warning'
        })
      }
      // console.log(error);
    });
  }
}
