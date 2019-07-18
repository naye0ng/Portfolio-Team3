<template>
<v-layout row justify-center>
    <v-card>
        <v-card-title>
        <span class="headline">Post Writer</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
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
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
        <v-btn color="blue darken-1" flat to="/post">Back</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
</v-layout>
</template>

<script>
import { VueEditor } from "vue2-editor";
import FirebaseService from '@/services/FirebaseService'

export default {
name : 'PostWriter',
components : {
    VueEditor,
},
data() {
    return {
    text : '',
    title : '',
    userEmail : this.$store.state.user.email,
    dialog: false
    };
},
mounted() {
},
methods : {
    save : function(event) {
        if(this.text == '' || this.title == '') {
            var alertMsg = '';
            if(this.title == '') {
            alertMsg = '제목은 필수항목입니다. 제목을 입력해주세요.'
            } else if(this.text == '') {
            alertMsg = '내용은 필수항목입니다. 내용을 입력해주세요';
            }

            this.$swal({
                type: 'error',
                title: 'Oops...',
                text: alertMsg
            });
        }
        else {
            FirebaseService.postPost(this.title, this.text, this.userEmail)
            this.dialog = false
            this.text = ''
            this.title = ''

            this.$swal({
            type : 'success',
            title : 'Great!',
            html : '저장되었습니다!</br>더 작성하시겠습니까?',
            showCancelButton : true,
            showConfirmButton : true,
            }).then((result) => {
            if(result.value) {
                // if clink ok
            }
            else {
                this.goPost();
            }
            })
        }
    },
    clear : function(event) {
    this.text = ''
    this.title = ''
    },
    goPost() {
    this.$router.push('/post');
    }
}
};
</script>
