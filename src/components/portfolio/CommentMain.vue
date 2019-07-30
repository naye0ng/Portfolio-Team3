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
                        <img :src="creator.avatar" alt="">
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
            <v-btn color="primary" dark @click="SignUp()">
                Save
                <v-icon dark right>check_circle</v-icon>
            </v-btn>
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
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampler'
      },
      comments: [
        // {
        //   id: 1,
        //   user: 'example',
        //   avatar: 'http://via.placeholder.com/100x100/a74848',
        //   text: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ',
        // },
        // {
        //   id: 2,                            
        //   user: 'example1',
        //   avatar: 'http://via.placeholder.com/100x100/2d58a7',
        //   text: 'lorem ipsum dolor',
        // },
        // {
        //   id: 3,                            
        //   user: 'example2',
        //   avatar: 'http://via.placeholder.com/100x100/36846e',
        //   text: 'lorem ipsum dolor again',
        // },
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
      const user=this.$store.getters.getUser;
      console.log(user);
      if(user !=null){      
        this.comments.push({
          id: this.comments.length + 1,
          user: this.current_user.user,
          avatar: this.current_user.avatar,
          text: reply
        });

        firestore.collection('portfolios').doc(this.port.id).collection('commentList')
        .add({
          id : user.id,
          name : user.name,
          text : reply, 
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }

      //여기에 파베에 insert하는 것으로 바
    },
    getCommentList(){
      var commentList= firestore.collection('portfolios').doc(this.port.id).collection('commentList');
      console.log(commentList)
      commentList
        .orderBy('time_stamp', 'desc')
        .get()
        .then((docSnapshots) => {
            docSnapshots.docs.map((doc) => {
            let data = doc.data()
            console.log(data.id); 
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