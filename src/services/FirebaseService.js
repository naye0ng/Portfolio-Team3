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
			console.error('[Google Login Error]', error)
		})
	}
}
