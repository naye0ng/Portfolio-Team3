import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'

// Setup Firebase
const config = {
  apiKey: "AIzaSyABGamq__VCiuIy4lAANPeLLEtaOsl8v6k",
  authDomain: "blogs-a7359.firebaseapp.com",
  databaseURL: "https://blogs-a7359.firebaseio.com",
  projectId: "blogs-a7359",
  storageBucket: "blogs-a7359.appspot.com",
  messagingSenderId: "749597724898",
  appId: "1:749597724898:web:dc4033993f01a42c"
  /* apiKey: "AIzaSyDeOmVEnsytGy8tgl1QjLdLLuMEru36Aak",
  authDomain: "team3-435f1.firebaseapp.com",
  databaseURL: "https://team3-435f1.firebaseio.com",
  projectId: "team3-435f1",
  storageBucket: "team3-435f1.appspot.com",
  messagingSenderId: "804761067334",
  appId: "1:804761067334:web:de1801641a9f3ddc" */
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
  postPost(title, body, user) {
    var likeCount = 0;

    return firestore.collection(POSTS).add({
      title,
      body,
      user,
      likeCount,
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
  postPortfolio(title, body, img, user) {
    
    //Create reference
    var ref = firebase.storage().ref();
    var file = img;
    var name = new Date() + title;
    var likeCount = 0;
    //Upload image to firestorage
    var uploadTask = ref.child(name).putString(file, 'data_url');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
    switch (error.code) {
      case 'storage/unauthorized':        
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  }, function() {
    console.log("funcgtion called")    
    //Get stored image url from firestorage
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        img = downloadURL
        console.log('File available at', img);
        firestore.collection(PORTFOLIOS).add({
          title,
          body,
          img,
          user,
          likeCount,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
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
                    return firebase.auth().signInWithPopup(provider).then(function (result) {
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
  loginAnno() {
    return firebase.auth().signInAnonymously().catch(function (error) {
      console.error(error);
    });
  },
  loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        alert('비밀번호가 틀렸습니다.');
      } else if (errorCode === 'auth/invalid-email') {
        alert('해당 이메일로 가입된 사용자가 존재하지 않습니다.');
      }
      console.log(error);
    });
  }
  ,
  logout() {
    return firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      console.error(error);
    });
  },
  curUser() {
    var user = firebase.auth().currentUser;
    return user;
  },
  LoginSuccess() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        alert(user.email)
        return user;
      } else {
      }
    });
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
        alert('이미 다른 이메일에 연결된 계정입니다');
      }
      else if (errorCode === 'auth/credential-already-in-use') {
        alert('이미 등록된 SNS 계정입니다')
      }
      console.log(error);
    });
  }
}
