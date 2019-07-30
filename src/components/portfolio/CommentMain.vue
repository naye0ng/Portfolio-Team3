<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
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
                :comments="comments"
                :current_user="current_user"
                :port="this.port"
                @submit-comment="submitComment"
                ></comments>
                </div>
            </div>
            <v-btn color="secondary" dark @click="dialog = false">
                Close
                <v-icon dark right>block</v-icon>
            </v-btn>
        </v-dialog> 
    </v-layout>
</template>

<script>
import Comments from './Comment.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
export default {
  components: {
    Comments
  },
  data() {
    return {
      likes: 15,

      creator: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampleCreator'
      },
      current_user: {
        avatar: '',
        user: ''
      },
      comments: [

      ],
      dialog:false
    }
  },
  methods: {
    refreshComment () {
      this.comments = [];
      this.getCommentList();
    },
    submitComment: function(reply) {
      const user=this.$store.getters.dbuser;
      console.log(user);  
      if(user !=null){      
        this.current_user.avatar=user.photoURL;
        this.current_user.user=user.name;
        this.comments.push({
          id: user.email,
          user: user.name,
          avatar: user.photoURL,
          text: reply
        });

        firestore.collection('portfolios').doc(this.port.id).collection('commentList')
        .add({
          id : user.email,
          name : user.name,
          text : reply, 
          time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
          avatar : user.photoURL
        })
      }

      //여기에 파베에 insert하는 것으로 바
    },
    getCommentList(){
      var commentList= firestore.collection('portfolios').doc(this.port.id).collection('commentList');
      commentList
        .orderBy('time_stamp', 'asc')
        .get()
        .then((docSnapshots) => {
            docSnapshots.docs.map((doc) => {
            let data = doc.data() 
            console.log(data);
            this.comments.push({
              id : data.id,
              avatar : data.avatar,
              user : data.name,
              text : data.text
            })
            })
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
  background-color: rgb(231, 129, 180);
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #333;
  min-height: 80px;
  font-size: 20px;
}
.comments-header .comments-stats span {
  margin-left: 10px;
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
  margin-left: 5px;
}
.post-owner .username > a {
  color: #333;
}
</style>