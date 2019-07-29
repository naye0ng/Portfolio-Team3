<template>
  <v-layout row wrap mb-5>
    <v-flex xs12>
      <div class="search-wrap">
        <div class="search">
            <input type="text" v-model="searchString" class="searchTerm" placeholder="Enter user name?">
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </v-flex> 
    <v-flex xs12>
      <table class='user-table'>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Access Level</th>
            <th class="text-left"></th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in searchUser">
            <td class="table-content">{{ user.name }}</td>
            <td class="table-content">{{ user.email }}</td>
            <td class="table-content" v-if="user.accessLevel == 0">Guest</td>
            <td class="table-content" v-if="user.accessLevel == 1">Member</td>
            <td class="table-content" v-if="user.accessLevel == 2">Admin</td>
            <td class="table-content">
              <form>
                <!-- <label class="radio-rabel"> -->
                <input type="radio" :name="user.email.split('@')[0]" value="0" :checked="user.accessLevel == 0" class="option-input"/> 
                <label class="radio-rabel">Guest</label>
                <input type="radio" :name="user.email.split('@')[0]" value="1" :checked="user.accessLevel == 1" class="option-input"/> 
                <label class="radio-rabel">Member</label>
                <input type="radio" :name="user.email.split('@')[0]" value="2" :checked="user.accessLevel == 2" class="option-input"/> 
                <label class="radio-rabel">Admin</label>
              </form>
            </td>
            <td class="table-content">        
              <button v-on:click="changeAccessLevel(user.email.split('@')[0], user.accessLevel)" class='lavel-btn'>변경</button>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
  </v-layout>
</template>
<script>
import firebase from "firebase";
import Swal from "sweetalert2";

export default {
  data () {
    return {
      searchString : '',
      users: [],
    }
  },
  computed :{
    searchUser : function(){
      if (!this.searchString){
        return this.users
      }
      return this.users.filter(user => {
        return user.name.includes(this.searchString) || user.email.includes(this.searchString)
      })
    }
  },
  methods: {
    getUsers() {
      firebase.database().ref().child("user").on("value", snapshot => {
        var user = snapshot.val();
        this.users = Object.values(user)
      })
    },
    changeAccessLevel(target, before){
      var el = document.getElementsByName(target)
      for(var i=0; i<el.length;i++){
        if(i != before && el[i].checked == true){
          firebase.database().ref().child("user").child(target).child("accessLevel").set(el[i].value)
          Swal.fire({
            type: 'success',
            title: '성공적으로 변경되었습니다.',
            showConfirmButton: false,
            timer: 1000
          });
        }
      }

    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
<style>
td.table-content{
  padding: 0 10px;
  margin: 0 10px;
  text-align:center;
}
.user-table{
  width:100%;
  border-collapse: collapse;
  border-spacing: 2px;
  border-bottom: 2px solid #dee2e6;
}
.user-table thead th{
    padding: .75rem;
    vertical-align: middle;
    border-top: 2px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
}
.user-table td {
    padding: .75rem;
    vertical-align: middle;
    border-bottom: 1px solid #dee2e6;
}
.lavel-btn{
  border-radius:5px;
  background-color: #dee2e6;
  color: #181818;
  padding: 3px 7px;
}
.lavel-btn:hover{
  background-color: #ec407a;
  color: #fff;
}
/* select tr */
@-webkit-keyframes change-color {
  0%   { background-color: #cbd1d8; }
  100% { background-color: green; }
}
@-moz-keyframes change-color {
  0%   { background-color: #cbd1d8; }
  100% { background-color: green; }
}
@-o-keyframes change-color {
  0%   { background-color: #cbd1d8; }
  100% { background-color: green; }
}
@keyframes change-color {
  0%   { background-color: #cbd1d8; }
  100% { background-color: green; }
}

.tr-animated {
  -webkit-animation: change-color 2s ease-in-out; /* Safari 4+ */
  -moz-animation:    change-color 2s ease-in-out; /* Fx 5+ */
  -o-animation:      change-color 2s ease-in-out; /* Opera 12+ */
  animation:         change-color 2s ease-in-out; /* IE 10+ */
}

/* radio css */
.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  height: 25px;
  width: 25px;
  top: 4px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  border-radius: 50%;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #ec407a;
}
.option-input:checked::before {
  height: 25px;
  width: 25px;
  position: absolute;
  content: '✔';
  display: inline-block;
  font-size: 13px;
  text-align: center;
  line-height: 27px;
}
.radio-rabel{
  position: relative;
  top: -5px;
  margin-right: 0.8rem;
}
</style>