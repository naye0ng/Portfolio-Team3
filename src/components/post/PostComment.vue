<template>
    <div class="comments">
      <div :class="comments_wrapper_classes">
          <single-comment
              v-for="comment in comments"
              :comment="comment"
              :key="comment.key"
              :port="port"
              @deleted="deleted"
          ></single-comment>
        </div>
        <hr>
        <div class="reply">
            <div class="avatar">
                <!-- <img :src="current_user.avatar" alt=""> -->
            </div>
            <input
                type="text"
                v-model.trim="reply"
                class="reply--text"
                placeholder="Leave a comment..."
                maxlength="250"
                required
                @keyup.enter="submitComment"
                v-if="this.$store.getters.getUser"
            />
            <button class="reply--button" @click.prevent="submitComment"><i class="fa fa-paper-plane"></i> Send</button>
        </div>
    </div>
</template>

<script>

import FirebaseService from "@/services/FirebaseService";
import  firebase  from 'firebase';
const firestore = firebase.firestore()

export default {
  data(){
    return{
      post : '',
      reply : '',
      comments : [],
      creator: {
        avatar: '',
        user: ''
      },
      current_user: {
        avatar: '',
        user: ''
      },
      comments: [],
    }
  },
  mounted(){
    this.getPort();
  },
  methods : {
      submitComment(){
        // this.creator.user=this.port.nickname;
        // this.creator.avatar=this.port.avatar;
        const user=this.$store.getters.dbuser;
        if(user!=null){
          this.current_user.avatar=user.photoURL;
          this.current_user.user=user.nickname;

          var key=user.email.split('@')[0];
          var date = new Date();
          firestore.collection('posts').doc(this.post.id).collection('commentList')
          .add({
            //email parsing 후(@앞 부분) key로 저장할것
          id: key,
          text : this.reply,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
          time_stamp : date,
          avatar : user.photoURL
          }).then(ref=>{
            console.log("here");
            this.comments.push({
                  key: ref.id,
                  id : key,
                  avatar : this.current_user.avatar,
                  user : this.current_user.user,
                  text : this.reply,
                  time_stamp : date,
              })
          })
        }
        this.reply='';
      },
      async getPort() {
          this.post = await FirebaseService.getPost(this.$route.params.id);
      }            
  },
  props : {
    id : {type: String}
  }
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
.reply {
    display: flex;
    position: relative;
    align-items: center;
    background-color: #EBEBEB;
    border-radius: 30px;
    padding: 5px 10px;
    overflow: hidden;
}
.reply .avatar {
    position: absolute;
}
.reply .avatar > img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}
.reply .reply--text {
    min-height: 40px;
    padding: 10px 10px 10px 55px;
    margin-right: 10px;
    border: 0;
    color: #333;
    width: 100%;
    outline: 0;
    background-color: transparent;
    box-shadow: none;
}
.reply input.reply--text:valid {
    margin-right: 71px;
}
.reply input.reply--text:valid + .reply--button {
    right: 10px;
}
.reply .reply--button {
    position: absolute;
    right: -100px;
    border: 1px solid #2a629c;
    background-color: transparent;
    color: #2a629c;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 15px;
    line-height: 1.5;
    border-radius: 30px;
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out, right 0.25s ease-in-out;
    outline: 0;
}
.reply .reply--button:hover {
    color: #fff;
    background-color: #2a629c;
}
.reply .reply--button:active {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
