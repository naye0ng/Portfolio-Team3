<template>
    <div class="comment">
        <div class="avatar">
            <img :src="comment.avatar" alt="">
        </div>
        <div class="text">
            <a class="username" href="#">@{{nickname }}</a> 
            <span>{{ comment.text }}</span> 
            <span v-if="this.$store.getters.getUser && comment.id === this.$store.getters.dbuser.email.split('@')[0]">
                <v-btn class="ma-2" color="red" dark v-on:click="deleteComment" style="cursor:pointer;"><v-icon>delete</v-icon></v-btn>
            </span>
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
                nickname:''
            }
        },
        mounted(){
            this.getNickname(this.comment.id);
        },
        methods : {
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
    align-items: center;
    color: #333;
    background-color: #F2F2F2;
    border-radius: 30px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
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
    margin-left: 5px;
}
.comment .text span {
    margin-left: 5px;
}
.comment .text .username {
    font-weight: bold;
    color: #333;
}
</style>
