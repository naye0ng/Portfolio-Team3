<template>
  <div class="comment pr-0" >
    <v-avatar size="40">
      <v-img :src="avatar" aspect-ratio="1" height="40px"></v-img>
    </v-avatar>
    <div class="text" style="align-self:center;">
      <div class="user">
        <a class="username body-1" href="#">{{nickname }}</a>
        <span>
          <span v-if="modYet">{{ comment.text }}</span>
          <div v-if="!modYet">
            <textarea id="mod-comment" :value="comment.text" rows=1></textarea>
            <button class="caption" id="mod-comment-btn" @click="subComment">submit</button>
          </div>
        </span>
      </div>
      <div class="date caption">{{formatedDate()}}</div>
    </div>
    <div class="del-btn" style="padding-bottom:15px;">
      <span v-if="this.$store.getters.getUser && comment.id === this.$store.getters.dbuser.email.split('@')[0]"
      v-on:click="showModifyTerminal"
      style="cursor:pointer;"
      @mouseenter="setModAfter()"
      @mouseleave="setModBefore()">
        <v-avatar tile size="25px">
          <img :src="getImgUrl(2)" alt="avatar">
        </v-avatar>
      </span>
      <!-- &nbsp; -->
      <span v-if="this.$store.getters.getUser && comment.id === this.$store.getters.dbuser.email.split('@')[0]"
      v-on:click="deleteComment"
      style="cursor:pointer;"
      @mouseenter="setOpen()"
      @mouseleave="setClose()">
        <v-avatar tile size="28px">
          <img :src="getImgUrl(1)" alt="avatar">
        </v-avatar>
      </span>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Swal from 'sweetalert2'

const firestore = firebase.firestore()

export default {
  name: 'singleComment',
  props: ['comment', 'port'],
  data(){
    return {
      nickname:'',
      avatar:'',
      trashicon:'closeTrash.png',
      modifyicon:'commentModBefore.png',
      modYet: true,
    }
  },
  mounted(){
    this.getNickname(this.comment.id);
    this.getAvatar(this.comment.id);
  },
  methods : {
    subComment() {
      var modComment = document.getElementById("mod-comment").value;
      firestore.collection('portfolios').doc(this.port.id).collection('commentList').doc(this.comment.key).update({
        text : modComment
      });
      this.comment.text = modComment;
      this.modYet = true;
    },
    setModAfter() {
      this.modifyicon = 'commentModAfter.png'
    },
    setModBefore() {
      this.modifyicon = 'commentModBefore.png'
    },
    getImgUrl(flag) {
      if(flag == 1)
        return require('@/assets/' + this.trashicon)
      if(flag == 2)
        return require('@/assets/' + this.modifyicon)
    },
    setOpen() {
      this.trashicon = 'openTrash.png'
    },
    setClose() {
      this.trashicon = 'closeTrash.png'
    },
    formatedDate() {
      if (this.comment){
        var date= this.comment.time_stamp;
        return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
      }
    },
    showModifyTerminal() {
      this.modYet=!this.modYet;
    },
    deleteComment(){
      // swal - 삭제할 거냐고 물어보기
      Swal.fire({
        title: '삭제하실거에요?😧',
        text: '삭제한 댓글은 복구가 불가능합니다.',
        type:'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then((result) => {
        if(result.value) {
          firestore.collection('portfolios').doc(this.port.id).collection('commentList').doc(this.comment.key).delete()
          this.$emit('deleted',this.comment.key);
          Swal.fire({
            title: '삭제되었습니다!',
            type: 'success'
          })
        }
      });

    },
    getNickname(id){
      firebase.database().ref("user").child(id).child('nickname').on("value", snapshot => {
        // console.log(snapshot.val())
        this.nickname = snapshot.val()
      })
    },
    getAvatar(id){
      firebase.database().ref("user").child(id).child('photoURL').on("value", snapshot => {
        // console.log(snapshot.val())
        this.avatar = snapshot.val()
      })
    }
  }
}
</script>

<style scoped>
/* Single-comment component */
@media(max-width:565px) {
  .comment {
    margin-bottom:0px!important;
    padding-top: 0px!important;
    padding-bottom: 0px!important;

  }
}
.comment {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
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
  width:78%;
}
.commemt .date {
  padding-top:2px;
}
.comment .user .username {
  font-weight: bold;
  margin-right: 5px;
}
.commemt .del-btn {
  /* align-self: flex-end; */
}
#mod-comment {
  width:80%;
  border-bottom: 1px solid #181818;
}
#mod-comment-btn {
  display:inline-block;
  width:14%;
  margin: auto 3%;
  font-weight: bold;
  color:#ec407d;
}
#mod-comment-btn:hover {
  color:#ffffff;
  background: #ec407d;
}
</style>
