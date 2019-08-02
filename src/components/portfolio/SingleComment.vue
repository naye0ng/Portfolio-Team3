<template>
  <div class="comment">
    <div class="avatar" >
      <img :src="comment.avatar" alt="">
    </div>
    <div class="text">
      <div class="user">
        <a class="username body-1" href="#">{{nickname }}</a>
        <span>{{ comment.text }}</span>
      </div>
      <div class="date caption">{{formatedDate()}}</div>
    </div>
    <div class="del-btn" style="align-self:flex-end;">
      <div v-if="this.$store.getters.getUser && comment.id === this.$store.getters.dbuser.email.split('@')[0]"
      v-on:click="deleteComment"
      style="cursor:pointer;"
      @mouseenter="setOpen()"
      @mouseleave="setClose()">
        <v-avatar tile size="20px">
          <img :src="getImgUrl()" alt="avatar">
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
const firestore = firebase.firestore()

export default {
  name: 'singleComment',
  props: ['comment', 'port'],
  data(){
    return {
      nickname:'',
      trashicon:'closeTrash.png'
    }
  },
  mounted(){
    this.getNickname(this.comment.id);
  },
  methods : {
    getImgUrl() {
      return require('@/assets/' + this.trashicon)
    },
    setOpen() {
      this.trashicon = 'openTrash.png'
    },
    setClose() {
      this.trashicon = 'closeTrash.png'
    },
    formatedDate() {
      if (this.comment.time_stamp){
        console.log(this.comment.time_stamp)
        var date = new Date(this.comment.time_stamp.toDate())
        return `${this.port.created_at.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
      }
    },
    deleteComment(){
      firestore.collection('portfolios').doc(this.port.id).collection('commentList').doc(this.comment.key).delete()
      this.$emit('deleted',this.comment.key);
    },
    getNickname(id){
      firebase.database().ref("user").child(id).child('nickname').on("value", snapshot => {
        // console.log(snapshot.val())
        this.nickname = snapshot.val()
      })
    }
  }
}
</script>

<style scoped>
/* Single-comment component */
.comment {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  align-items: end;
}
.comment .avatar {
  align-self: flex-start;
}
.comment .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  align-self: start;
}
.comment .text {
  text-align: left;
  margin-left: 10px;
  align-self: flex-end;
  width:80%;
}
.commemt .date {
  padding-top:2px;
}
.comment .user .username {
  font-weight: bold;
  margin-right: 5px;
}
.commemt .del-btn {
  align-self: flex-end;
}
</style>
