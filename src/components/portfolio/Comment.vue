<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="#181818" v-on="on" style="width:80%; color:#f7f7f7;">
                <v-icon size="25" class="mr-2">fa-user-plus</v-icon>댓글달기
            </v-btn>
        </template>
        <div class="comments-outside">
            <div class="comments-header">
                <div class="comments-stats">
                    <span><i class="fa fa-thumbs-up"></i> [[ likes ]]</span>
                    <span><i class="fa fa-comment"></i> [[ comments.length ]]</span>
                </div>
                <div class="project-owner">
                    <div class="avatar">
                        <img :src="creator.avatar" alt="">
                    </div>
                    <div class="username">
                        <a href="#">@[[ creator.user ]]</a>
                    </div>
                </div>
            </div>
            <comments 
                :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
                :comments="comments"
                :current_user="current_user"
                @submit-comment="submitComment"
            ></comments>
        </div>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
    data() {
        return {
            likes:12,
            creator: {
                avatar: 'http://via.placeholder.com/100x100/36846e',
                user:'owner'
            },
            current_user:{
                avatar: 'http://via.placeholder.com/100x100/a74848',
                user: 'exampler'
            },
            comments: [
                {
                    id:'',
                    user:'',
                    avatar:'',
                    text: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor',
                }
            ]
        }
    },
    methods: {
      submitComment : function(reply){
          this.comments.push({
              id:'',
              user: this.current_user.user,
              avatar: this.current_user.avatar,
              text:reply
          });
      }
    }
};
</script>
