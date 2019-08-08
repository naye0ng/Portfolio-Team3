<template>
  <v-container id="user-table">
    <v-layout row wrap mb-5>
      <v-flex xs12>
        <div class="search-wrap">
          <div class="search">
            <input
              type="text"
              v-model="searchString"
              class="searchTerm"
              placeholder="Enter user name?"
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <table class="user-table">
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
              <td class="table-content alert-wrap">
                <div v-if="user.email.split('@')[0] in alerts" class="alert-el"></div>
                {{ user.name }}
              </td>
              <td class="table-content">{{ user.email }}</td>
              <td class="table-content" v-if="user.accessLevel == 0">Guest</td>
              <td class="table-content" v-if="user.accessLevel == 1">Member</td>
              <td class="table-content" v-if="user.accessLevel == 2">Admin</td>
              <td class="table-content">
                <form>
                  <div class="check-wrap">
                    <input
                      type="radio"
                      :name="user.email.split('@')[0]"
                      value="0"
                      :checked="user.accessLevel == 0"
                      class="option-input"
                    />
                    <label class="radio-rabel">Guest</label>
                  </div>
                  <div class="check-wrap">
                    <input
                      type="radio"
                      :name="user.email.split('@')[0]"
                      value="1"
                      :checked="user.accessLevel == 1"
                      class="option-input"
                    />
                    <label class="radio-rabel">Member</label>
                  </div>
                  <div class="check-wrap">
                    <input
                      type="radio"
                      :name="user.email.split('@')[0]"
                      value="2"
                      :checked="user.accessLevel == 2"
                      class="option-input"
                    />
                    <label class="radio-rabel">Admin</label>
                  </div>
                </form>
              </td>
              <td class="table-content">
                <button
                  v-on:click="changeAccessLevel(user.email.split('@')[0], user.accessLevel)"
                  class="lavel-btn"
                >변경</button>
                <button
                  v-on:click="deleteAlert(user.email.split('@')[0])"
                  class="lavel-btn"
                  style="margin-left:10px;"
                >거절</button>
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from "firebase";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchString: "",
      users: [],
      alerts: {}
    };
  },
  computed: {
    searchUser: function() {
      if (!this.searchString) {
        return this.users;
      }
      return this.users.filter(user => {
        return (
          user.name.includes(this.searchString) ||
          user.email.includes(this.searchString)
        );
      });
    }
  },
  methods: {
    getUsers() {
      firebase
        .database()
        .ref()
        .child("user")
        .on("value", snapshot => {
          var user = snapshot.val();
          this.users = Object.values(user);
          this.getAlerts();
          this.$store.state.isLoading = false;
        });
    },
    getAlerts() {
      firebase
        .database()
        .ref()
        .child("upgrade")
        .on("value", snapshot => {
          this.alerts = Object.assign({}, snapshot.val());
        });
    },
    deleteAlert(target) {
      firebase
        .database()
        .ref()
        .child("upgrade")
        .child(target)
        .remove();
      this.getAlerts();
    },
    changeAccessLevel(target, before) {
      var el = document.getElementsByName(target);
      for (var i = 0; i < el.length; i++) {
        if (i != before && el[i].checked == true) {
          // 권한 등록
          firebase
            .database()
            .ref()
            .child("user")
            .child(target)
            .child("accessLevel")
            .set(el[i].value);
          // 알람 삭제
          this.deleteAlert(target);
          Swal.fire({
            type: "success",
            title: "성공적으로 변경되었습니다.",
            showConfirmButton: false,
            timer: 1000
          });
        }
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style>
td.table-content {
  padding: 0 10px;
  margin: 0 10px;
  text-align: center;
  color: #fff;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 2px;
  border-bottom: 2px solid #dee2e6;
}
.user-table thead th {
  color: #fff;
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 2px solid #dee2e6;
  border-bottom: 2px solid #dee2e6;
}
.user-table td {
  padding: 0.75rem;
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6;
}
.lavel-btn {
  border-radius: 5px;
  background-color: #dee2e6;
  color: #181818;
  padding: 3px 7px;
}
.lavel-btn:hover {
  background-color: #ec407a;
  color: #fff;
}
.alert-wrap {
  position: relative;
  padding-left: 15px;
}
.alert-el {
  position: absolute;
  display: block;
  overflow: hidden;
  width: 10px;
  height: 10px;
  left: 0px;
  top: 18px;
  background-color: #ec407a;
  border-radius: 50%;
}
#admin .searchTerm {
  color:#fff!important;
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
  content: "✔";
  display: inline-block;
  font-size: 13px;
  text-align: center;
  line-height: 27px;
}
.radio-rabel {
  position: relative;
  top: -5px;
  margin-right: 0.8rem;
}
.check-wrap {
  display: inline-block;
}
#admin .search-wrap {
  width: 250px;
}
@media (max-width: 960px) {
  #user-table {
    padding-left: 30px;
    padding-right: 30px;
  }
  .layout.wrap,
  .user-table td {
    overflow: hidden;
  }
  td.table-content {
    padding: 5px 0;
  }
}
@media (max-width: 750px) {
  .lavel-btn {
    display: block;
  }
  .lavel-btn:nth-child(2) {
    margin-left: 0 !important;
    margin-top: 5px;
  }
}
@media (max-width: 700px) {
  .lavel-btn {
    display: block;
  }
  .lavel-btn:nth-child(2) {
    margin-left: 0 !important;
    margin-top: 5px;
  }
  .check-wrap {
    display: block;
    text-align: left;
  }
  .user-table thead th {
    font-size: 12px;
    padding-left: 0;
    padding-right: 0;
  }
  .user-table td {
    font-size: 12px;
  }
}
</style>