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
          // Get firestore documentID
          data.id = doc.id;
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postPost(user, title, body, id) {
    /* Check id
          if id != null : it is exist POST
          if id == null : it is new POST */ 
    if(id != null) {
      firestore.collection(POSTS).doc(id).set({
        user,
        title,
        body,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        console.log("Modify post succeed")
      }).catch(function() {
        console.error("Modify post failed")
      });
    }
    else{
      firestore.collection(POSTS).add({
        user,
        title,
        body,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        console.log("Post post succeed")
      }).catch(function() {
        console.error("Post post failed")
      });
    }
  },
  deletePost(id){
    firestore.collection(POSTS).doc(id).delete().then(function() {
      console.log("Delete post succeed(firestore)")
    }).catch(function() {
      console.error("Delete post error(firestore)")
    });
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          // Get firestore documentID
          data.id = doc.id;
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postPortfolio(user, title, body, img, id) {
    console.log("uploadId : " + id)
    
    /* Check image status
          if img.substr(0,4) === 'data' : it is base64 type data url (not uploaded yet)
          img.substr(0,4) !== 'data' : it is firestorage url (already uploaded firestorage) */ 
    if(img.substr(0,4) === 'data'){
      // Create firestorage reference
      var ref = firebase.storage().ref();
      
      // Create simple date
      function getFormatDate(date){ var year = date.getFullYear();
        var year = date.getFullYear();
        var month = (1 + date.getMonth());
        var month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '' + month + '' + day;
      }

      // Image name setting
      var name = getFormatDate(new Date()) + '_' + title;

      // Upload image to firestorage
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
        // Get stored image url from firestorage
        uploadTask.snapshot.ref.getDownloadURL().then(function(fireImg) {
          img = fireImg
          
          /* Check id
          if id != null : it is exist PORTFOLIO
          if id == null : it is new PORTFOLIO */ 
          if(id != null) {
            firestore.collection(PORTFOLIOS).doc(id).set({
              user,
              title,
              body,
              img,
              created_at: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function(){
              console.log("Modify portfolio succeed")
            }).catch(function() {
              console.error("Modify portfolio failed")
            });
          }
          else{
            firestore.collection(PORTFOLIOS).add({
              user,
              title,
              body,
              img,
              created_at: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function(){
              console.log("Post portfolio succeed")
            }).catch(function() {
              console.error("Post portfolio failed")
            });
          }
        });
      });
    }
    else {
      /* Check id
          if id != null : it is exist PORTFOLIO
          if id == null : it is new PORTFOLIO */ 
      if(id != null) {
        firestore.collection(PORTFOLIOS).doc(id).set({
          user,
          title,
          body,
          img,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(){
          console.log("Modify portfolio succeed")
        }).catch(function() {
          console.error("Modify portfolio failed")
        });
      }
      else{
        firestore.collection(PORTFOLIOS).add({
          user,
          title,
          body,
          img,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(){
          console.log("Post portfolio succeed")
        }).catch(function() {
          console.error("Post portfolio failed")
        });
      }
    }
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
  getPortfolio(id){
    let port =  firestore.collection(PORTFOLIOS).doc(id)
    return port.get()
      .then(doc => {
        var data = doc.data();
        data.created_at = new Date(data.created_at.toDate())
        return data;
      });
  },
  getPost(id){
    let post = firestore.collection(POSTS).doc(id)
    return post.get()
      .then(doc => {
        var data = doc.data();
        data.created_at = new Date(data.created_at.toDate())
        return data;
      })
  },
  curUser() {
    var user = firebase.auth().currentUser;
    return user;
  },
}
