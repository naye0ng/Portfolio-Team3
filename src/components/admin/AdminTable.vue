<template>
  <v-simple-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Access Level</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user">
        <td class="table-content">{{ user.name }}</td>
        <td class="table-content">{{ user.email }}</td>
        <td class="table-content" style="text-align:center">{{ user.accessLevel }}</td>
        <td class="table-content">
          <v-radio-group v-model="row" row>
            <v-radio
                label="Guest"
                color="primary"
                value="0"
              ></v-radio>
            <v-radio
                label="Member"
                color="success"
                value="1"
              ></v-radio>
            <v-radio
                label="Admin"
                color="error"
                value="2"
              ></v-radio>
          </v-radio-group>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
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
        console.log(this.users)
      })
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
}
</style>