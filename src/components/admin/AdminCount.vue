<template>
    <v-layout row wrap mb-5>
        <v-flex xs12 sm4 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">POST 게시글 수</h3>
            </v-card-title>
            <div class="result-num">30</div>
            </v-card>
        </v-flex>
        <v-flex xs12 sm4 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">PORTFOLIO 게시글 수</h3>
            </v-card-title>
            <div class="result-num">5</div>
            </v-card>
        </v-flex>
        <v-flex xs12 sm4 px-3 py-3>
            <v-card class="graph-card" style="padding:10px;">
            <v-card-title primary-title>
                <h3 class="mb-2 card-title">가입자 수</h3>
            </v-card-title>
            <div class="result-num">100</div>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
export default{
    data (){      
      return{
        
      }
    },
    methods : {
        
    }
  }
</script>
