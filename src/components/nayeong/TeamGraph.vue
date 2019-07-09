<template>
    <div>
        <p class="display-3 my-5 pt-5 text-xs-left text-sm-center">Hi, We are Team3!</p>
        <canvas id="teamChart" width="100%" height="50%"></canvas>
        <canvas id="memberChart" width="100%" height="50%"></canvas>
    </div>
</template>

<script>
import chart from 'chart.js'
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
        createTeamGraph(data){
            
        },
        createMemberGraph(data){            
            var m_na = 0
            var m_won = 0
            var m_ah = 0
            var m_tong = 0
            var m_jo =0
            for(let i=data.length-1;i>=0;i--){
                let author = data[i].commit.author.name
                if(author == 'naye0ng'){
                    m_na += 1
                }else if(author == "Park Haewon"){
                    m_won += 1
                }else if(author == "Yongbeom Jo"){
                    m_jo += 1
                }else if(author == "KimTongWook"){
                    m_tong += 1
                }else {
                    m_ah += 1
                }
            }
            var ctx = document.getElementById('memberChart')
            var memberChart = new chart.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["김나영", "김동욱", "박해원", "임현아", "조용범"],
                    datasets: [{
                        label: '# Team3 member commits',
                        data: [m_na, m_tong, m_won, m_ah, m_jo],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    },
    mounted() {
        var commits = this.getCommits()
        commits.then(data =>{
            this.createTeamGraph(data)
            this.createMemberGraph(data)
        })
    }
}
</script>
