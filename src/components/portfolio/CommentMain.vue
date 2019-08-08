<template>
<<<<<<< HEAD
    <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" v-on:click="refreshComment" style="width:80%; color:#f7f7f7; background-color:#181818!important;">
                    <v-icon size="25" class="mr-2">fa-user-plus</v-icon>댓글보기
                </v-btn>
            </template>
            <div id="main">
                <div class="comments-outside">
                <div class="comments-header">
                    <div class="comments-stats">
                        <span><i class="fa fa-thumbs-up"></i> {{ likes }}</span>
                        <span><i class="fa fa-comment"></i> {{ comments.length }}</span>
                    </div>
                    <div class="post-owner">
                        <div class="avatar">
                        <img :src="creator.avatar" alt="">  <!-- -->
                        </div>
                        <div class="username">
                        <a href="#">@{{ creator.user }}</a>
                        </div>
                    </div>
                </div>
                <comments 
                :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
                :comments="getCommentList"
                :current_user="current_user"
                :port="this.port"
                @submit-comment="submitComment"
                ></comments>
                </div>
=======
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-flex xs10 mb-5>
          <v-btn v-on="on" v-on:click="refreshComment" style="width:80%; color:#f7f7f7; background-color:#181818!important;">
            <v-icon size="25" class="mr-2">fa-user-plus</v-icon>댓글보기
          </v-btn>
        </v-flex>
      </template>
      <div id="main">
        <div class="comments-outside">
          <div class="comments-header">
            <div class="post-owner">
              <v-avatar size="32pt">
                <img :src="creator.avatar" alt="">  <!-- -->
              </v-avatar>
              <div class="username">
                <strong><a href="#" class="body-1">{{ creator.user }}</a></strong>
                <div class="caption">{{formatedDate()}}</div>
              </div>
>>>>>>> 17bc7dd1a93b3a1dda71ae89e7e8feb607b883d2
            </div>
            <div class="jhcomments-stats pr-3">
              <span class="body-1"><i class="fa fa-comment body-2"></i>&nbsp;{{ comments.length }}</span>
            </div>
          </div>
          <v-divider class="my-0"></v-divider>
          <comments
          :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
          :comments="comments"
          :current_user="current_user"
          :port="this.port"
          @submit-comment="submitComment"
          @big_deleted="big_deleted"
          >
        </comments>
      </div>
    </div>
  </v-dialog>
</v-layout>
</template>

<script>
import Comments from './Comment.vue'
import firebase from 'firebase/app'
import FirebaseService from "@/services/FirebaseService"
import 'firebase/firestore'

const firestore = firebase.firestore()
export default {
  components: {
    Comments
  },
  data() {
    return {
<<<<<<< HEAD
      likes: 15,
=======
>>>>>>> 17bc7dd1a93b3a1dda71ae89e7e8feb607b883d2
      creator: {
        avatar: '',
        user: ''
      },
      current_user: {
        avatar: '',
        user: ''
      },
      comments: [],
      dialog:false,
<<<<<<< HEAD
      isActive : true,
=======
>>>>>>> 17bc7dd1a93b3a1dda71ae89e7e8feb607b883d2
    }
  },
  mounted(){
    if (this.port){
      this.getCreatorInfo(this.port.user);
    }
    const user=this.$store.getters.dbuser;
    if(user!=null){
      this.current_user.avatar=user.photoURL; 
      this.current_user.user=user.nickname;
    }
  },
  computed: {
    user(){ // Get user information from vuex
      return this.$store.getters.getUser;
    }
  },
  computed : {
    getCommentList(){
      if(this.isActive && typeof this.port != 'undefined'){
        console.log(this.port.id)
        var commentList= firestore.collection('portfolios').doc(this.port.id).collection('commentList')
        commentList.orderBy('time_stamp', 'desc').get()
          .then((docSnapshots) => {
            var result = []
            docSnapshots.docs.map(doc => {
              let data = doc.data()
              data.key=doc.id;
              var getKey =data.id;
              firebase.database().ref("user").once("value").then((snapshot)=>{
                var users = snapshot.val()
                // console.log(users)
                if(users.hasOwnProperty(getKey)){
                  result.push({
                      key: data.key,
                      id : data.id,
                      avatar : data.avatar,
                      user : users[getKey].nickname,
                      text : data.text  
                    })
                }
                })
            })
            this.isActive = false
            console.log(result)
            console.log('이거임',typeof result)
            return result
          })
      }
    }
  },
  methods: {
    formatedDate() {
      if (this.port.created_at){
        return `${this.port.created_at.getFullYear()}년 ${this.port.created_at.getMonth()+1}월 ${this.port.created_at.getDate()}일`
      }
    },
    refreshComment () {
      const user=this.$store.getters.dbuser;
      if(user!=null){
        this.current_user.avatar=user.photoURL;
        this.current_user.user=user.nickname;
      }
      this.comments = [];
<<<<<<< HEAD
      this.creator.user=this.port.nickname;
      this.creator.avatar=this.port.avatar; 
      // this.getCommentList();
=======
      this.getCreatorInfo(this.port.user);
      this.getCommentList();
>>>>>>> 17bc7dd1a93b3a1dda71ae89e7e8feb607b883d2
    },
    big_deleted(key){
      for (let i=0;i<this.comments.length;i++){
        if (this.comments[i].key == key){
          this.comments.splice(i,1);
          break;
        }
      }
    },
    async submitComment(reply){
      const user=this.$store.getters.dbuser;

      ////////////////////////////////////////////////////////
      //If Someone write comment(slave), writer of post or portfolio(master) receive push notification
      console.log("Comment PUSH")
      
      //get receiver's token
      var tkr = await FirebaseService.getSingleToken(this.port.user)
      console.log("incommentMain : " + tkr.token)
      var type = "댓글"
      //필요없는 정보는 '' 으로 보내기
      FirebaseService.ShotPushMessage(tkr.token, user.email, reply, type)
      ///////////////////////////////////////////////////////

      if(user !=null){
        this.current_user.avatar=user.photoURL;
        this.current_user.user=user.name;
        var key=user.email.split('@')[0];
        var date = new Date();
        firestore.collection('portfolios').doc(this.port.id).collection('commentList')
        .add({
          //email parsing 후(@앞 부분) key로 저장할것
          id: key,
          text : reply,
          time_stamp : date,
        }).then(ref=>{
          this.comments.push({
            key: ref.id,
            id : key,
            text : reply,
            time_stamp : date,
          })
        })
      }
      if(user!=null){
        this.current_user.avatar=user.photoURL;
        this.current_user.user=user.nickname;
      }
    },
    getCommentList(){
      this.comments=[]
      var commentList= firestore.collection('portfolios').doc(this.port.id).collection('commentList');
      commentList
<<<<<<< HEAD
        .orderBy('time_stamp', 'desc')
        .get()
        .then((docSnapshots) => {
            docSnapshots.docs.map((doc) => {
            let data = doc.data()
            data.key=doc.id;
            var getKey=data.id;
            var query=firebase.database().ref("user").orderByKey();
            query.once("value").then((snapshot)=>{
                snapshot.forEach((childSnapshot)=>{
                  var key=childSnapshot.key;
                  var childData=childSnapshot.val();
                  if(key===getKey){
                    this.comments.push({
                      key: data.key,
                      id : data.id,
                      avatar : data.avatar,
                      user : childData.nickname,
                      text : data.text  
                    })
                  }
                })
                console.log("dddd",this.comments)
              })
            });
=======
      .orderBy('time_stamp', 'asc')
      .get()
      .then((docSnapshots) => {
        docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.key=doc.id;
          var getKey=data.id;
          this.comments.push({
            key : data.key,
            id: data.id,
            text: data.text,
            time_stamp : new Date(data.time_stamp.toDate())
>>>>>>> 17bc7dd1a93b3a1dda71ae89e7e8feb607b883d2
          })
        })
      })
    },
    getCreatorInfo(userid){
      var key=userid.split('@')[0];
      firebase.database().ref("user").child(key).on("value", snapshot => {
        this.creator.avatar = snapshot.val().photoURL;
        this.creator.user = snapshot.val().nickname;
      })
    }
  },
  props: ['port']
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ececec;
  margin: 1em 0;
  padding: 0;
}
.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 600px;
  background-color: white;
}
.comments-header {
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #181818;
  min-height: 80px;
  font-size: 20px;
}
.comments-header .comments-stats span{
  margin-right: 10px;
  margin-left: 10px;
  text-align: bottom;
}
.post-owner {
  display: flex;
  align-items: center;
}
.post-owner .avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.post-owner .username {
  margin-left: 10px;
  text-align: left;
  color: black;
}
.post-owner .username > a {
  color: #333;
}

</style>
