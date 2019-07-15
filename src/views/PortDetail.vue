<template>
    <div>
        <v-container>
            <v-layout my-5 wrap>
                
                <!-- Title -->
                <v-flex xs12>
                <div class="mb-3">{{title}}</div>
                </v-flex>

                <!-- Image -->
                <v-flex xs12>
                    <v-img :src="imgSrc"></v-img>
                </v-flex>

                <!-- Contentes -->
                <v-flex xs12>
                <br/>
                    <p v-html="body"></p>
                </v-flex>
            </v-layout>
            <v-layout>
                <!-- go back button -->
                <v-flex xs12 text-xs-center round my-5>
                    <v-btn color="none" text-xs-center dark to="/" ><v-icon size="25" class="mr-2">fa-plus</v-icon>돌아가기</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import PortfolioList from '../components/PortfolioList'

export default {
    name: 'PortfolioPage',
    components: {
        PortfolioList
    },
    computed: {
        title(){
            return this.$route.params.title
        },
        imgSrc(){
            return this.$route.params.imgSrc
        },
        body(){
            return this.$route.params.body
        }
    }
    
}
</script>
