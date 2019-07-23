import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Swal from 'sweetalert2'

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

    //Create reference
    var ref = firebase.storage().ref();
    var file = img;
    var name = new Date() + title;

    //Upload image to firestorage
    var uploadTask = ref.child(name).putString(file, 'data_url');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(error) {
        //catch error
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;

          case 'storage/unknown':
            break;
        }
      }, function() {
        //Get stored image url from firestorage
        img = uploadTask.snapshot.ref.getDownloadURL()
    });

    //Save Portfolio in firestore database
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  curUser() {
    var user = firebase.auth().currentUser;
    return user;
  },
}
