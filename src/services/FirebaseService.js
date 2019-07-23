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
          data.id = doc.id;
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postPortfolio(title, body, img) {

    //Create reference
    var ref = firebase.storage().ref();
    
    //Create simple date
    function getFormatDate(date){ var year = date.getFullYear();
      var year = date.getFullYear();
      var month = (1 + date.getMonth());
      var month = month >= 10 ? month : '0' + month;
      var day = date.getDate();
      day = day >= 10 ? day : '0' + day;
      return year + '' + month + '' + day;
    }

    //Image name setting
    var name = getFormatDate(new Date()) + '_' + title;

    //Upload image to firestorage
    var uploadTask = ref.child('images/' + name).putString(img, 'data_url');
    
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
      //Get stored image url from firestorage
      uploadTask.snapshot.ref.getDownloadURL().then(function(img) {
        console.log('File url is : ', img);
        
        //Upload portfolio to firestore
        firestore.collection(PORTFOLIOS).add({
          title,
          body,
          img,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Upload portfolio succeed")
      });
    });
  },
  deletePortfolio(id, imgSrc){

    var desertRef = firebase.storage().refFromURL(imgSrc);
    desertRef.delete().then(function() {
      console.log("Delete image succeed(firestorage)")
    }).catch(function(error) {
      console.error("Delete image error(firestorage)")
    });

    firestore.collection(PORTFOLIOS).doc(id).delete().then(function() {
      console.log("Delete portfolio succeed(firestore)")
    }).catch(function() {
      console.error("Delete portfolio error(firestore)")
    });
  },
  curUser() {
    var user = firebase.auth().currentUser;
    return user;
  },
}
