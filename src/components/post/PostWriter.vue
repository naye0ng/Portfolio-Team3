<template>
  <v-layout row justify-center>
    <v-card>
      <v-card-title style="padding-left:40px;">
        <span class="headline">Post Writer</span>
      </v-card-title>
      <v-card-text class="pb-0 pt-0">
        <v-container grid-list-md pt-0>
          <v-layout wrap>
            <!-- title -->
            <v-flex xs12>
              <v-text-field label="Title" v-model="title" required></v-text-field>
            </v-flex>
            <!-- Markdown editor -->
            <v-flex xs12>
              <template>
                <div id="app">
                  <vue-editor v-model="text"></vue-editor>
                </div>
              </template>
            </v-flex>
            <v-flex xs4>
              <v-text-field label="tag 1" v-model="tag1"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field label="tag 2" v-model="tag2"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field label="tag 3" v-model="tag3"></v-text-field>
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
import Swal from 'sweetalert2'

export default {
  name: "PostWriter",
  components: {
    VueEditor
  },
  data() {
    return {
      text: '', // Bind with markdown editor
      title: '',
      postId: null,
      userEmail : '',
      tag: [],
      tag1: '',
      tag2: '',
      tag3: '',
      date: '',
      dialog: false,
      logoImg: require('@/assets/logo.png')
    };
  },
  mounted() {
    // If modify post, PostWriter.vue can get data from Post modal
    if (this.$route.params.id){
      this.postId = this.$route.params.id
      this.title = this.$route.params.title
      this.text = this.$route.params.body
      this.tag = this.$route.params.tag
      this.userEmail = this.$route.params.user
      this.date = this.$route.params.date
      if (this.tag){
        this.tag1 = this.tag[0];
        if (this.tag.length>1){
          this.tag2 = this.tag[1];
          if (this.tag.length>2){
            this.tag3 = this.tag[2];
          }
        }
      }
    }
    //Get userinfo from vuex
    else{
        this.$store.dispatch("checkUserStatus")
      .then(()=>{
        this.userEmail = this.$store.getters.getUser.email;
      });
    }
     
  },
  methods: {
    // Save post
    save: function(event) {
      // Blank check
      if (this.text === "" || this.title === "") {
        var alertMsg = "";
        if (this.title == "") {
          alertMsg = "제목은 필수항목입니다. 제목을 입력해주세요."
        } else if (this.text == "") {
          alertMsg = "내용은 필수항목입니다. 내용을 입력해주세요"
        }
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: alertMsg
        });
      } else {
        this.tag = [];
        if(this.tag1){
          this.tag.push(this.tag1);
          // this.tag[0] = (this.tag1);
        }
        if (this.tag2){
          this.tag.push(this.tag2);
          // this.tag[1] = this.tag2;
        }
        if (this.tag3){
          this.tag.push(this.tag3);
          // this.tag[2] = this.tag3;
        }
        if (this.tag){
          this.tag = [...new Set(this.tag)]
        }
        // Call Firebase service
        FirebaseService.postPost(this.userEmail, this.title, this.text, this.postId, this.tag, this.logoImg, this.date)
        this.dialog = false
        
        // Reinitialize data
        this.text = ''
        this.title = ''
        this.tag = []
        this.date = ''

        // Success popup
        Swal.fire({
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
    clear: function(event) { // ClearBtn
      this.text = "";
      this.title = "";
      this.tag = []
    },
    goPost() {
      this.$router.push("/post");
    }
  }
};
</script>
