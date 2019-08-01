<template>
    <div class="comment">
        <div class="avatar">
            <img :src="comment.avatar" alt="">
        </div>
        <div class="text">
            <a class="username" href="#">@{{ comment.user }}</a> 
            <span>{{ comment.text }}</span> 
            <span><v-btn class="ma-2" color="red" dark v-on:click="deleteComment"><v-icon>delete</v-icon></v-btn></span>
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
        methods : {
            deleteComment(){
                console.log(this.port);
                console.log(this.comment);
                firestore.collection('portfolios').doc(this.port.id).collection('commentList').doc(this.comment.key).delete()
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