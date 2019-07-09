<template>
    <div>
        <p class="display-3 my-5 pt-5 text-xs-left text-sm-center">Hi, We are Team3!</p>
        <div id="graph-container"></div>
    </div>
</template>

<script>
// import { createGitgraph } from "@gitgraph/js";
import axios from 'axios'

export default {
    name : 'TeamGraph',
    data : {
    },
    methods : {
        async getCommits(){
            var response = await axios.get('https://api.github.com/repos/naye0ng/Portfolio-Team3/commits')
            return response.data
        },
        createGraph(data){
            var commits = []
            // for(let i=data.length-1; i>=0 ; i--){
            //     commits.push({ 
            //         hash : data[i].sha,
            //         subject: data[i].commit.message,
            //         author: data[i].commit.author.name+' <'+data[i].commit.author.email+'>' 
            //         })
            // }
            // console.log(commits)
            // data.forEach(commit => {
            //     var author 

            // });

        }
    },
    mounted() {
        var commits = this.getCommits()
        commits.then(data =>{
            this.createGraph(data)
        })
    }
}
</script>
