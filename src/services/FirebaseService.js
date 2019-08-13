import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import FirebaseService from '@/services/FirebaseService'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const TAGS = 'tags'
const TOKENS = 'tokens'

// Setup Firebase
const config = {
  // apiKey: "AIzaSyABGamq__VCiuIy4lAANPeLLEtaOsl8v6k",
  // authDomain: "blogs-a7359.firebaseapp.com",
  // databaseURL: "https://blogs-a7359.firebaseio.com",
  // projectId: "blogs-a7359",
  // storageBucket: "blogs-a7359.appspot.com",
  // messagingSenderId: "749597724898",
  //appId: "1:749597724898:web:dc4033993f01a42c"
  apiKey: "AIzaSyBwi4B2tqFYbNQD3GOr44VQgcpO4CINH7w",
  authDomain: "hello-team3.firebaseapp.com",
  databaseURL: "https://hello-team3.firebaseio.com",
  projectId: "hello-team3",
  storageBucket: "hello-team3.appspot.com",
  messagingSenderId: "253343349927",
  appId: "1:253343349927:web:29381730f0313bc1"
};


var app = firebase.initializeApp(config)
var db = firebase.firestore(app)
var firestore = firebase.firestore()

firebase.firestore().enablePersistence()
.catch(function(err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

db.collection("cities").where("state", "==", "CA")
.onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
  snapshot.docChanges().forEach(function(change) {
    if (change.type === "added") {
      console.log("New city: ", change.doc.data());
    }

    var source = snapshot.metadata.fromCache ? "local cache" : "server";
    console.log("Data came from " + source);
  });
});


//FCM PUSH
//Get firebase messaging function
var fcm_flag = false;
var messaging = {};

try {
  messaging = firebase.messaging();
  fcm_flag = true;
} catch { // fcm 존재하지 않을 때
  console.log("error")
}
//Set VApiIdKey
if(fcm_flag) {
  messaging.usePublicVapidKey("BIzmSWlNtAHJFGEKd6MczQdoVoXBH2LrXOp6opk7zKd-7MpWLXaDpQUxaMcHvnc9fN2dNcf65x-KAJoa--56KVw");

  // Get push in foreground status. payload = push notification
  messaging.onMessage(function(payload){
    console.log('onMessage: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    if (Notification.permission === "granted") {
      var notification = new Notification(notificationTitle, notificationOptions);
    }
  });
}

export default {
  getPushPermission(email){
    //Request notification permission
    if(fcm_flag) {
      messaging.requestPermission()
      .then(function() {
        console.log("WE HAVE PERMISSION");
        return messaging.getToken();
      })
      //If messaging called with token
      .then(function(token){
        console.log("TOKEN IS : " + token)
        //Save token into firestore database
        FirebaseService.saveTokens(token, email)
        //TODO : need to check admin
      })
      .catch(function(err) {
        console.log("Error occuered in RP")
      });
    }

  },
  async getSingleToken(email){
    console.log("getSingleToken")
    var token = await firestore.collection(TOKENS).doc(email)
    return token.get()
    .then(doc => {
      var data = doc.data();
      //console.log("fbs : " + data.token)
      return data;
    });
  },
  async getTokens() {
    console.log("getTokenSequence")
    var temp = []
    var tokenbox = []
    await firestore.collection(TOKENS)
    .get()
    .then((docSnapshots) => {
      docSnapshots.forEach((doc) => {
        temp.push(doc.data().token)
      })
      tokenbox = temp.filter( (item, idx, array) => {
        return array.indexOf( item ) === idx ;
      });
    })
    .catch(function(err){
      console.log("Get Tokens fail : " + err)
    })
    console.log("tokenbox : " + tokenbox)
    return tokenbox
  },
  saveTokens(token, email) {
    console.log("saveTokenSequence")
    console.log("Token id is : " + token)
    firestore.collection(TOKENS).doc(email).set({
      token,
      email
    })
    .then(function(){
      console.log("Save token success")
    })
    .catch(function(err){
      console.log("Save token failed : " + err)
    })
  },
  pushBullet(id, title, type, img){
    console.log("pushbullet : " + img)
    var tokenList = FirebaseService.getTokens()
    .then(function(result) {
      result.forEach(function(singleToken) {
        console.log("SingleToken ::: " + singleToken)
        FirebaseService.ShotPushMessage(singleToken, id, title, type, img)
      })
    }
  )
},
ShotPushMessage(to, userId, title, type, img) {
  //console.log("Shot to : " + to)
  var request = require("request");
  request.post({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAOvxwvKc:APA91bFJ7C8SdWCqfA1hqvPjd0swlvujyBbdAw545uBNba3q0qGTlU83xq9HRvA70DpYUs1zNZb1Y_CaXpcOP3KPOO--XUMoef_6R7mz3DatPGP28WpqAMJOAtiGo3FZomUaqh1eM0ry'
    },
    uri: "https://fcm.googleapis.com/fcm/send",
    body: JSON.stringify({
      "to": to,
      "notification": {
        "title": title,
        "body": userId + "님의 새 " + type,
        "icon": img
        // 'https://source.unsplash.com/random/100x100' is Success
        // '../assets/logo.png' is Fail
        // Get Img from portfolioWriter's data() is Success
        // Goal :: Get Post image from firestorage
      }
    }),
  }, function (error, response, body) {
    //console.log(body);
  });
},
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
async postPost(user, title, body, id, tag, img, yesterday) {
  var type = "게시글"
  FirebaseService.pushBullet(user, title, type, img)
  var date = new Date()
  /* Check id
  if id != null : it is exist POST
  if id == null : it is new POST */
  if(id != null) {
    //이전 태그를 아니깐, 지우는거 처리
    var tmp = await this.deleteTag(id);
    firestore.collection(POSTS).doc(id).set({
      user,
      title,
      body,
      created_at: yesterday,
      tag
    }).then(function(){
      console.log("Modify post succeed")
      tag.forEach(async tagg => {
        let curtag = firestore.collection(TAGS).doc(tagg)
        var temp = tagg
        const doc = await curtag.get()
        if (doc.exists){
          var data = doc.data();
          data.postlist = data.postlist.concat([id]);
          firestore.collection(TAGS).doc(temp).set({
            postlist : data.postlist
          })
        }
        else{
          firestore.collection(TAGS).doc(temp).set({
            postlist : [id]
          })
        }
      })
    }).catch(function() {
      console.error("Modify post failed")
    });
  }
  else{
    firestore.collection(POSTS).add({
      user,
      title,
      body,
      created_at: date,
      tag
    }).then(ref=>{
      console.log("Post post succeed")
      var id = ref.id
      tag.forEach(async tagg => {
        let curtag = firestore.collection(TAGS).doc(tagg)
        var temp = tagg
        const doc = await curtag.get()
        if (doc.exists){
          var data = doc.data();
          data.postlist = data.postlist.concat([id]);
          firestore.collection(TAGS).doc(temp).set({
            postlist : data.postlist
          })
        }
        else{
          firestore.collection(TAGS).doc(temp).set({
            postlist : [id]
          })
        }
      })
    }).catch(function() {
      console.error("Post post failed")
    });
  }
},

async deletePost(id){
  var cons = await this.deleteTag(id);
  firestore.collection(POSTS).doc(id).delete().then(function() {
    console.log("Delete post succeed(firestore)")
  }).catch(function() {
    console.error("Delete post error(firestore)")
  });
},

async asyncForEach(array, callback){
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
},
async deleteTag(id){
  var beforepost = firestore.collection(POSTS).doc(id)
  const beforedoc = await beforepost.get()
  var data = beforedoc.data();
  var beforetag = data.tag

  await this.asyncForEach(beforetag, async (tagg) => {
    let tag2 = firestore.collection(TAGS).doc(tagg)
    const doc = await tag2.get()
    var data = doc.data();
    var index = data.postlist.indexOf(id);
    data.postlist.splice(index, 1);
    // console.log(data.postlist);
    if (data.postlist.length>0){
      await firestore.collection(TAGS).doc(tagg).set({
        postlist : data.postlist
      })
    }
    else{
      await firestore.collection(TAGS).doc(tagg).delete();
    }
  });
},
getPortfolios() {
  const portsCollection = firestore.collection(PORTFOLIOS)
  return portsCollection
  .orderBy('created_at', 'desc')
  .get()
  .then((docSnapshots) => {
    return docSnapshots.docs.map((doc) => {
      let data = doc.data()
      // console.log(data);
      // Get firestore documentID
      data.id = doc.id;
      data.created_at = new Date(data.created_at.toDate())
      return data
    })
  })
},
async profilePhotoUploader(email, key, img) {

  var ref = firebase.storage().ref();

  // Image name setting
  var name = email;

  // Upload image to firestorage
  var uploadTask = ref.child('profile/' + name).putString(img, 'data_url');
  await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
    uploadTask.snapshot.ref.getDownloadURL().then(function(storageOutputUrl) {
      //console.log("storageOutput : " + storageOutputUrl)
      firebase.database().ref("user").child(key).child('photoURL').set(storageOutputUrl)
    })
  })
},

postPortfolio(user, title, body, dataUrl, fireUrl, id, avatar, nickname, yesterday) {
  var type = "포트폴리오"
  //FirebaseService.pushBullet(user, title, type)
  var date = new Date()

  /* Check image status
  if img.substr(0,4) === 'data' : it is base64 type data url (not uploaded yet)
  img.substr(0,4) !== 'data' : it is firestorage url (already uploaded firestorage) */
  if(fireUrl == ''){
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
    var uploadTask = ref.child('images/' + name).putString(dataUrl, 'data_url');

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
      uploadTask.snapshot.ref.getDownloadURL().then(function(storageOutputUrl) {
        console.log("storageOutput : " + storageOutputUrl)
        fireUrl = storageOutputUrl
        /* Check id
        if id != null : it is exist PORTFOLIO
        if id == null : it is new PORTFOLIO */
        if(id != null) {
          firestore.collection(PORTFOLIOS).doc(id).set({
            user,
            title,
            body,
            fireUrl,
            //dataUrl,
            avatar,
            nickname,
            created_at: yesterday,
          }).then(function(){
            console.log("Modify portfolio succeed")
          }).catch(function() {
            console.error("Modify portfolio failed")
          });
        }
        else{
          console.log("ADDPORTFOLIO")
          firestore.collection(PORTFOLIOS).add({
            user,
            title,
            body,
            fireUrl,
            //dataUrl,
            avatar,
            nickname,
            created_at: date,
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
    firestore.collection(PORTFOLIOS).doc(id).set({
      user,
      title,
      body,
      fireUrl,
      //dataUrl,
      avatar,
      nickname,
      created_at: yesterday,
    }).then(function(){
      console.log("Modify portfolio succeed")
    }).catch(function() {
      console.error("Modify portfolio failed")
    });
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
    data.created_at = new Date(data.created_at.toDate());
    data.id = doc.id;
    return data;
  });
},
async getPost(id){
  let post = firestore.collection(POSTS).doc(id)
  return post.get()
  .then(doc => {
    var data = doc.data();
    data.created_at = new Date(data.created_at.toDate());
    data.id = id;
    return data;
  })
},
getTag(id){
  let tag = firestore.collection(TAGS).doc(id)
  return tag.get()
  .then(doc => {
    if (doc.exists){
      var data = doc.data();
      return data;
    }
    else{
      return null;
    }
  })
},
getTags() {
  const tagsCollection = firestore.collection(TAGS)
  return tagsCollection
  .get()
  .then((docSnapshots) => {
    return docSnapshots.docs.map((doc) => {
      let data = doc.data()
      // Get firestore documentID
      data.id = doc.id;
      return data
    })
  })
},
async deletePortLike(portid, useremail){
  await firestore.collection('portfolios').doc(portid).collection('likeList').doc(useremail).delete();
  return true;
},
async addPortLike(portid, useremail){
  await firestore.collection('portfolios').doc(portid).collection('likeList').doc(useremail).set({
    created_at : firebase.firestore.FieldValue.serverTimestamp(),
  });
  return true;
},
checkPortLike(portid, useremail){
  const likes = firestore.collection('portfolios').doc(portid).collection('likeList').doc(useremail);
  return likes.get()
  .then(doc => {
    if (doc.exists){
      return true;
    }
    else{
      return false;
    }
  })
},
getPortLikeCount(portid){
  return firestore.collection(PORTFOLIOS).doc(portid).collection('likeList').get().then(snap => {
    return snap.size // will return the collection size
  });
},
getPortLikers(portid){
  const portsCollection = firestore.collection(PORTFOLIOS).doc(portid).collection('likeList')
  return portsCollection
  .orderBy('created_at','desc')
  .get()
  .then((docSnapshots) => {
    return docSnapshots.docs.map((doc) => {
      let data = doc.data()
      // Get firestore documentID
      data.user = doc.id;
      return data
    })
  })
},
async deletePostLike(postid, useremail){
  await firestore.collection(POSTS).doc(postid).collection('likeList').doc(useremail).delete();
  return true;
},
async addPostLike(postid, useremail){
  await firestore.collection(POSTS).doc(postid).collection('likeList').doc(useremail).set({
    created_at : firebase.firestore.FieldValue.serverTimestamp(),
  });
  return true;
},
checkPostLike(postid, useremail){
  const likes = firestore.collection(POSTS).doc(postid).collection('likeList').doc(useremail);
  return likes.get()
  .then(doc => {
    if (doc.exists){
      return true;
    }
    else{
      return false;
    }
  })
},
getPostLikeCount(postid){
  return firestore.collection(POSTS).doc(postid).collection('likeList').get().then(snap => {
    return snap.size // will return the collection size
  });
},
getPostLikers(postid){
  const postsCollection = firestore.collection(POSTS).doc(postid).collection('likeList')
  return postsCollection
  .orderBy('created_at','desc')
  .get()
  .then((docSnapshots) => {
    return docSnapshots.docs.map((doc) => {
      let data = doc.data()
      // Get firestore documentID
      data.user = doc.id;
      return data
    })
  })
},
getPostCommentCount(postid){
  return firestore.collection(POSTS).doc(postid).collection('commentList').get().then(snap=>{
    return snap.size;
  })
},
curUser() {
  var user = firebase.auth().currentUser;
  return user;
},
}
