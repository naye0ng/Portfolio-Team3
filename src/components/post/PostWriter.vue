<template>
  <v-layout row justify-center>
    <v-card>
      <v-card-title style="padding-left:40px;">
        <span class="headline">Post Writer</span>
      </v-card-title>
      <v-card-text class="pb-0 pt-0">
        <v-container grid-list-md pt-0>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Title" v-model="title" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <template>
                <div id="app">
                  <vue-editor v-model="text"></vue-editor>
                </div>
              </template>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="bg-1">
        <v-spacer></v-spacer>
        <button @click="clear" class="button button--wayra2 button--border-thin button--text-medium button--size-xs"
            style="min-width:120px; max-width:120px;padding:0.3em 0.5em;margin:0.2em;">
              Clear
          </button>
          <router-link to="/post">
            <button class="button button--wayra2 button--border-thin button--text-medium button--size-xs"
              style="min-width:120px; max-width:120px;padding:0.3em 0.5em;margin:0.2em;">
                Back
            </button>
          </router-link>
          <button @click="save" class="button button--wayra2 button--border-thin button--text-medium button--size-xs"
            style="min-width:120px; max-width:120px;padding:0.3em 0.5em;margin:0.2em;">
              Save
          </button>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import { VueEditor } from "vue2-editor";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostWriter",
  components: {
    VueEditor
  },
  data() {
    return {
      text: "",
      title: "",
      dialog: false
    };
  },
  mounted() {},
  methods: {
    save: function(event) {
      if (this.text == "" || this.title == "") {
        var alertMsg = "";
        if (this.title == "") {
          alertMsg = "제목은 필수항목입니다. 제목을 입력해주세요.";
        } else if (this.text == "") {
          alertMsg = "내용은 필수항목입니다. 내용을 입력해주세요";
        }

        this.$swal({
          type: "error",
          title: "Oops...",
          text: alertMsg
        });
      } else {
        FirebaseService.postPost(this.title, this.text);
        this.dialog = false;
        this.text = "";
        this.title = "";

        this.$swal({
          type: "success",
          title: "Great!",
          html: "저장되었습니다!</br>더 작성하시겠습니까?",
          showCancelButton: true,
          showConfirmButton: true
        }).then(result => {
          if (result.value) {
            // if clink ok
          } else {
            this.goPost();
          }
        });
      }
    },
    clear: function(event) {
      this.text = "";
      this.title = "";
    },
    goPost() {
      this.$router.push("/post");
    }
  }
};
</script>
