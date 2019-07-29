<template>
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
      <tr v-for="user in users" :key="user">
        <td class="table-content">{{ user.name }}</td>
        <td class="table-content">{{ user.email }}</td>
        <td class="table-content" v-if="user.accessLevel == 0">Guest</td>
        <td class="table-content" v-if="user.accessLevel == 1">Member</td>
        <td class="table-content" v-if="user.accessLevel == 2">Admin</td>
        <td class="table-content">
          <form>
            <input type="radio" :name="user.email.split('@')[0]" value="0" :checked="user.accessLevel == 0" /> Guest
            <input type="radio" :name="user.email.split('@')[0]" value="1" :checked="user.accessLevel == 1" /> Member
            <input type="radio" :name="user.email.split('@')[0]" value="2" :checked="user.accessLevel == 2" /> Admin
          </form>
        </td>
        <td class="table-content">        
          <button v-on:click="changeAccessLevel(user.email.split('@')[0])" class='lavel-btn'>변경</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import firebase from "firebase";
export default {
  data () {
    return {
      users: [],
    }
  },
  methods: {
    getUsers() {
      firebase.database().ref().child("user").on("value", snapshot => {
        var user = snapshot.val();
        this.users = Object.values(user)
      })
    },
    changeAccessLevel(targetName){
      var el = document.getElementsByName(targetName)
      for(var i=0; i<el.length;i++){
        if(el[i].checked == true){
          firebase.database().ref().child("user").child(targetName).child("accessLevel").set(el[i].value)
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
</style>