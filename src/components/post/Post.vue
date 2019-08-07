<template>
  <div>
    <v-layout pt-1 pl-3 h-100 justify-center>
      <v-flex xs12>
        <div class="card-media">
          <div class="card-media-body">
            <div class="card-media-body-top">
              <span class="subtle">{{formatedDate}}</span>
              <div class="card-media-body-top-icons" style="margin-top:2.5px;">
                <div class="u-float-right">
                  <i class="fa fa-heart">
                  </i>
                  <div class="caption grey--text" style="display:inline-block;">&nbsp;{{likecount}}</div>
                  <i class="fa fa-comment">
                  </i>
                  <div class="caption grey--text" style="display:inline-block;">&nbsp;{{commentcount}} </div>
                </div>
              </div>
              <div class="card-media-body-top2">
                <div class="card-media-body-top-text u-float-right">
                <div class="caption grey--text u-float-right">
                  <v-avatar size="35">
                    <v-img :src="userimg" aspect-ratio="1" height="35px"></v-img>
                  </v-avatar>
                  <!-- <span class="subtle" id="postemail">&nbsp;{{email}}</span> -->
                </div>
              </div>
              </div>
            </div>
            <span class="card-media-body-heading">{{title}}</span>
            <div class="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal mb-1">
              <span class="card-media-body-supporting-bottom-text subtle" v-for="i in tag.length" @click="filter(tag[i-1])" style="cursor:pointer;">
                #{{tag[i-1]}}&nbsp;
              </span>
              <router-link :to="{name: 'postdetail',
                  params: {id: id}}">
                <span class="card-media-body-supporting-bottom-text card-media-link u-float-right" style="cursor:pointer; color:#ec407a;">Detail</span>
              </router-link>
            </div>
            <div class="card-media-body-supporting-bottom">
              <span class="card-media-body-supporting-bottom-text subtle pt-3" v-for="i in tag.length">#{{tag[i-1]}}&nbsp;</span>
              <!-- <span class="card-media-body-supporting-bottom-text subtle u-float-right mb-1 mr-1">Team3</span> -->
               <span class="card-media-body-supporting-bottom-text subtle u-float-right">
                <ul class="card-media-object-social-list">
                  <li>
                    <img src="@/assets/ha.png" class style="width:25px; height:30px;" />
                  </li>
                  <li>
                    <img src="@/assets/jo.png" class style="width:25px; height:30px;" />
                  </li>
                  <li>
                    <img src="@/assets/na.png" class style="width:25px; height:30px;" />
                  </li>
                  <li>
                    <img src="@/assets/dong.png" class style="width:25px; height:30px;" />
                  </li>
                  <li>
                    <img src="@/assets/won.png" class style="width:25px; height:30px;" />
                  </li>
                </ul> 
               </span>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: "Post",
  props: { // props data from PostList.vue
    email: {type: String},
    date: { type: Date },
    title: { type: String },
    body: { type: String },
    id: {type: String},
    tag: {type:Array},
  },
  data(){
    return {
      userimg:'',
      usernickname:'',
      likecount:0,
      commentcount:0,
    }
  },
  mounted(){
    this.getUserImg(this.email);
    this.getLikeCount();
    this.getCommentCount();
  },
  computed : {
    formatedDate() {
      if (this.date){
        return `${this.date.getFullYear()}년 ${this.date.getMonth()+1}월 ${this.date.getDate()}일`
      }
    },
  },
  methods:{
    filter(keyword){
      this.$store.commit('SET_searchtag',keyword);
    },
    getUserImg(userid){
      var key=userid.split('@')[0];
      firebase.database().ref("user").child(key).on("value", snapshot => {
        this.userimg = snapshot.val().photoURL;
        this.usernickname = snapshot.val().nickname;
      })
    },
    async getLikeCount(){
      this.likecount = await FirebaseService.getPostLikeCount(this.id);
    },
    async getCommentCount(){
      this.commentcount = await FirebaseService.getPostCommentCount(this.id);
    }
  }
};
</script>
<style>
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
.post-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.post-body {
  max-height: 6.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

html {
  background-color: #fefefe;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.container {
  margin: 50px auto 0;
  width: 700px;
}

.u-float-right {
  float: right;
}

.u-flex-center {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}

.subtle {
  color: #888;
  font-size: 12px;
}

.card-media {
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  height: 125px;
  margin-bottom: 25px;
  transition: all 300ms ease-out;
  width: 100%;
}

.card-media:hover {
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.2);
}

.card-media-object-container {
  background: none;
  float: left;
  height: 100%;
  width: 35%;
  position: relative;
}

.card-media-object {
  background-position: center center;
  background-size: cover;
  height: 100%;
}

.card-media-object:after {
  content: " ";
  display: block;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 300ms ease-out;
  z-index: 10;
}

.card-media:hover .card-media-object:after {
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 52%,
    rgba(0, 0, 0, 0.4) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 52%,
    rgba(0, 0, 0, 0.4) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 52%,
    rgba(0, 0, 0, 0.4) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 );
  opacity: 1;
}

.card-media-object-tag {
  background-color: #fff;
  border-radius: 2px;
  padding: 2px 7px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.card-media-object-social-list {
  bottom: 0px;
  left: 10px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  /* position: absolute; */
  z-index: -100;
}

.card-media-body-top-email{
  z-index: -100;
}

.card-media-object-social-list li {
  border-radius: 50%;
  display: inline-block;
  height: 25px;
  margin-right: 2px;
  opacity: 1;
  overflow: hidden;
  transform: translateY(5px);
  transition: all 300ms ease-out;
  width: 25px;
}

/* .card-media:hover .card-media-object-social-list li {
  opacity: 1;
  transform: translateY(0);
} */

.card-media-object-social-list li:nth-child(1) {
  transition-delay: 0;
}
.card-media-object-social-list li:nth-child(2) {
  transition-delay: 75ms;
}
.card-media-object-social-list li:nth-child(3) {
  transition-delay: 150ms;
}

.card-media-object-social-list-item-additional {
  border: 1px solid #181818;
  color: #181818;
  font-size: 12px;
  padding-top: 7px;
  text-align: center;
}

.card-media-body {
  background-color: #fff;
  float: left;
  height: 100%;
  padding: 12px 15px;
  position: relative;
  width: 100%;
}

.card-media-body-top {
  display: block;
}

.card-media-body-top-icons {
  position:absolute;
  top: 10px;
  right: 20px;
  opacity:0;
  transition: all 300ms ease-out;
  transform: translateY(-5px);
}


.card-media:hover .card-media-body-top-text {
  position: absolute;
  opacity: 0;
  transform: translateY(-8px);
}

.card-media:hover .card-media-body-top-icons {
  position:absolute;
  opacity: 1;
  transform: translateY(0);
}


.card-media-body-top-icons i {
  /* cursor: pointer; */
  margin-left: 10px;
  transition: all 300ms ease-out;
}

.card-media-body-heading {
  display: block;
  font-size:1.6rem;
  margin-top: 10px;
}

.card-media-body-supporting-bottom {
  position: absolute;
  bottom: 5px;
  left: 0;
  opacity: 1;
  padding: 0 15px;
  transition: all 300ms ease-out;
  width: 100%;
}

.card-media-body-top2{
  position:absolute;
  top: 10px;
  right: 20px;
  opacity:1;
  transition: all 300ms ease-out;
  width: 82%;
}

.card-media-body-top-text{
  display: inline-block;
  /* margin-top:-2px; */
}

.card-media:hover .card-media-body-supporting-bottom {
  opacity: 0;
  transform: translateY(-8px);
}

.card-media-body-supporting-bottom-text {
  display: inline-block;
}

.card-media-body-supporting-bottom-reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: all 300ms ease-out;
  z-index:100;
}

.card-media:hover .card-media-body-supporting-bottom-reveal {
  opacity: 1;
  transform: translateY(0);
  z-index:100;
}

.card-media-link {
  /* color: #41c1f2; */
  text-decoration: none;
}

</style>
