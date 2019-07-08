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
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function(error) {
			var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.');
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      }
		})
  },
  loginWithFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken;
      let user = result.user;
      return result
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.');
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      }
    });
  },
  loginWithGithub(){
    let provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken;
      let user = result.user;
      return result
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // User's email already exists.
        // The pending GitHub credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        firebase.auth().fetchSignInMethodsForEmail(email).then(function(methods) {
          if (methods[0] === 'password') {
            var password = firebase.promptUserForPassword(); // TODO: implement promptUserForPassword.
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
              // Step 4a.
              return user.linkWithCredential(pendingCred);
            }).then(function() {
              goToApp();
            });
            return;
          }
          var provider = getProviderForProviderId(methods[0]);
          firebase.auth().signInWithPopup(provider).then(function(result) {
            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
              goToApp();
            });
          });
        });
      }
      else {
        console.error(error);
      }
    });
  },
  logout(){
    return firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error(error);
    });
  },
  curUser(){
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
    return user
  }
}