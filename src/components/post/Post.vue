<template>
  <div>
    <v-layout pt-1 pl-3 h-100 justify-center>
      <v-flex xs11>
        <div class="card-media">
          <div class="card-media-body">
            <div class="card-media-body-top">
              <span class="subtle">{{formatedDate}}</span>
              <div class="card-media-body-top-icons u-float-right" style="margin-top:2.5px;">
                <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                  />
                </svg>
                <svg fill="#888888" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            </div>
            <span class="card-media-body-heading">{{title}}</span>
            <div class="card-media-body-supporting-bottom">
              <ul class="card-media-object-social-list">
                
                <li>
                  <img src="@/assets/ha.png" class style="width:30px; height:30px;" />
                </li>
                <li>
                  <img src="@/assets/jo.png" class style="width:30px; height:30px;" />
                </li>
                <li>
                  <img src="@/assets/na.png" class style="width:30px; height:30px;" />
                </li>
                <li>
                  <img src="@/assets/dong.png" class style="width:30px; height:30px;" />
                </li>
                <li>
                  <img src="@/assets/won.png" class style="width:30px; height:30px;" />
                </li>
              </ul> 
              <span class="card-media-body-supporting-bottom-text subtle u-float-right mb-1 mr-1">Team3</span>
            </div>
            <div class="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal mb-1">
              <span class="card-media-body-supporting-bottom-text subtle">#Hello #Universe</span>
              <router-link :to="{name: 'postdetail',
                  params: {id: id}}">
                <span class="card-media-body-supporting-bottom-text card-media-link u-float-right" style="cursor:pointer; color:#ec407a;">Detail</span>
               </router-link>
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
    id: {type: String}
  },
  computed : {
    formatedDate() {
      if (this.date){
        return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
      }
    },
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
  position: absolute;
  z-index: 2;
}

.card-media-object-social-list li {
  border-radius: 50%;
  display: inline-block;
  height: 30px;
  margin-right: 6px;
  opacity: 1;
  overflow: hidden;
  transform: translateY(5px);
  transition: all 300ms ease-out;
  width: 30px;
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
  margin-top: -2px;
  opacity: 0;
  transition: all 300ms ease-out;
  transform: translateY(-5px);
}

.card-media:hover .card-media-body-top-icons {
  opacity: 1;
  transform: translateY(0);
}

.card-media-body-top-icons > svg {
  cursor: pointer;
  margin-left: 10px;
  transition: all 300ms ease-out;
}

.card-media-body-top-icons > svg:hover {
  fill: #444;
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
}

.card-media:hover .card-media-body-supporting-bottom-reveal {
  opacity: 1;
  transform: translateY(0);
}

.card-media-link {
  /* color: #41c1f2; */
  text-decoration: none;
}
</style>
