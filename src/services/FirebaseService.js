import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'

// Setup Firebase
const config = {
  apiKey: "AIzaSyDeOmVEnsytGy8tgl1QjLdLLuMEru36Aak",
  authDomain: "team3-435f1.firebaseapp.com",
  databaseURL: "https://team3-435f1.firebaseio.com",
  projectId: "team3-435f1",
  storageBucket: "team3-435f1.appspot.com",
  messagingSenderId: "804761067334",
  appId: "1:804761067334:web:de1801641a9f3ddc"
};


firebase.initializeApp(config)
const firestore = firebase.firestore()

export default {
  getPosts() {
    const postsCollection = firestore.collection(POSTS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postPost(title, body) {
    return firestore.collection(POSTS).add({
      title,
      body,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postPortfolio(title, body, img) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  loginWithGoogle() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        let provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithPopup(provider)
          .catch(function (error) {
            console.error(error)
          })
      })
  },
  loginWithFacebook() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        let provider = new firebase.auth.FacebookAuthProvider()
        return firebase.auth().signInWithPopup(provider)
        .catch(function (error) {
          console.error(error)
        })
      })
  },
  loginWithGithub() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      let provider = new firebase.auth.GithubAuthProvider()
      return firebase.auth().signInWithPopup(provider)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          var pendingCred = error.credential;
          var email = error.email;
          firebase.auth().fetchSignInMethodsForEmail(email).then(function (methods) {
            if (methods[0] === 'password') {
              var password = promptUserForPassword();
              return firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                return user.linkWithCredential(pendingCred);
              }).then(function () {
                return result
              });
            }
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(function () {
                let provider = new firebase.auth.GoogleAuthProvider()
                return firebase.auth().signInWithPopup(provider).then(function(result){
                  return result.user.linkAndRetrieveDataWithCredential(pendingCred)
                })
                  .catch(function (error) {
                    console.error(error)
                  })
              })
            })
        }
        else {
          console.error(error);
        }
      })
    })
  },
  loginAnno(){
    return firebase.auth().signInAnonymously().catch(function(error) {
      console.error(error);
    });
  },
  logout() {
    return firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      console.error(error);
    });
  },
  curUser() {
    var user = firebase.auth().currentUser;
    return user;
  }
}
