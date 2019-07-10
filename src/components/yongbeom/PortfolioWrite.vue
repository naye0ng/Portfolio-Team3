<template>
    <div>
        <ImgBanner imgSrc="https://source.unsplash.com/5brvJbR1Pn8/1600x900">
            <div style="line-height:1.2em;font-size:1.2em;" slot="text">Write Portfolio</div>
        </ImgBanner>
        <v-container>
            <v-layout>
                <v-flex xs12 md7 offset-md1>
                    <v-form>
                        <v-text-field
                        v-model="title"
                        label="Title"
                        required>
                        </v-text-field>

                        <!-- call image uploader -->
                        <img-uploaderv-on:downloadURL="getDownloadUrl" v-bind:oldImgUrl="oldImgUrl" class="mb-4"></img-uploaderv-on:downloadURL="getDownloadUrl">
                    </v-form>
                </v-flex>
                
                <!-- markdown editor -->
                <v-flex xs12 md7 offset-md1>
                    <vue-editor></vue-editor>
                    <!-- <vue-editor
                        id="writer"
                        v-model="content"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded"
                    ></vue-editor> -->
                </v-flex>
                    
                <!-- write button -->
                <v-flex xs12 md7 offset-md1>
                    <v-btn @click="savePost">save</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ImgBanner from '../ImgBanner'

import { VueEditor } from 'vuetify-markdown-editor'

import { firestore } from '@/firebase/firestore'
import { firestorage } from '@/firebase/firestorage'

import ImgUploader from './ImgUploader'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/vuex/mutation_types'

export default {
    components: {
        VueEditor,
        ImgUploader
    },
    data () {
        return {
            oldImgUrl: ''
        }
    },
    created () {
        if (this.$route.name === 'writer') this.initArticleData()
        if (this.getKey !== '') this.oldImgUrl = this.getImgUrl
    },
    computed: {
        ...mapGetters(['getKey', 'getTitle', 'getContent', 'getImgUrl', 'getWriter', 'getUser']),
        title: {
            get () {
                return this.getTitle
            },
            set (value) {
                this.updateTitle(value)
            }
        },
        content: {
            get () {
                return this.getContent
            },
            set (value) {
                this.updateContent(value)
            }
        }
    },
    methods: {
        ...mapMutations({
            updateTitle: types.SET_TITLE,
            updateContent: types.SET_CONTENT,
            initArticleData: types.INIT_ARTICLE_DATA
        }),
        savePost () {
            firestore
                .collection('Post')
                .doc(this.getKey || new Date().getTime().toString())
                .set({
            title: this.title,
            content: this.content,
            date: {
                seconds: new Date().getTime(),
                nanoseconds: 0
            },
            writer: this.getUser.displayName || this.writer,
            imgUrl: this.imgUrl || this.getImgUrl,
            show: true
                })
                .then(() => this.$router.push('/'))
                .catch((error) => {
                    console.error(`Error adding document: ${error}`)
                })
        },
        getDownloadUrl (v) {
            this.imgUrl = v
        },
        handleImageAdded (file, Editor, cursorLocation) {
            let uploadTask = firestorage.ref('images/' + file.name).put(file)
            uploadTask.on('state_changed', snapshot => {
                }, error => {
                    console.error(`Upload error occured: ${error}`)
                }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL)
                    Editor.insertEmbed(cursorLocation, 'image', downloadURL)
                })
            })
        }
    }
}
</script>

<style>
#writer .ql-editor {
    min-height: 500px;
}
</style>
