<template>
  <div>
    <!-- <DeveloperList imgSrc="https://source.unsplash.com/random/1600x900"/> -->
    <DeveloperList/>
    <!-- <v-container> -->
      <!-- About Me -->
      <v-layout my-5>
        <v-flex class="text-xs-center" xs12>
          <h2 class="headline mb-3">About Me</h2>
          <!--<p class="mr-4"></p>-->
          <v-img :src="getImgUrl('profile.png')" aspect-ratio="2">
            <!--
            <v-layout justify-center style="height:100%;">
              <v-flex xs6>
                <p>test</p>
              </v-flex>
            </v-layout>
          -->
            <AboutUs></AboutUs>
          </v-img>

        </v-flex>
        <!--
        <v-flex xs4  hidden-sm-and-down>

        </v-flex>
      -->
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5 row wrap>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
          <PortfolioList></PortfolioList>
        </v-flex>
        <v-flex xs12 text-xs-center mt-3>
          <v-btn color="#df4a31" dark to="/portfolio">
            <v-icon size="25" class="mr-2">fa-plus</v-icon>Portfolio 더보기
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- Post -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Post</h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>


      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Project</h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>
    <!-- </v-container> -->
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import firebase from 'firebase'
import DeveloperList from '../components/hyunah/DeveloperList'
import AboutUs from '../components/hyunah/AboutUs'

export default {
	name: 'HomePage',
	components: {
		ImgBanner,
		PortfolioList,
		PostList,
		RepositoryList,
    DeveloperList,
    AboutUs
	},
	methods: {
		getImgUrl(img) {
			return require('../assets/' + img)
    },
    checkChrome(){
      var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      if(isChrome == false) {
        this.$swal({
            type: 'error',
            title: 'Oops...',
            text: '해당 사이트는 크롬에 최적화되어있습니다. 정상적으로 작동하지 않을 수 있습니다.'
        });
      }
    },
    pushWebLog(){
      var date_time = new Date();
      var date = date_time.toDateString()

      if(this.$store.state.date != date){
        var log = {}
        log.date_time = date_time.toString()
        log.user = this.$store.state.user === null ? '' : this.$store.state.user.email
        this.$store.state.date = date
        this.$store.state.key =  firebase.database().ref().child("logs").child(date).push(log).key
        localStorage.setItem('log_date',this.$store.state.date)
        localStorage.setItem('log_key',this.$store.state.key)
      }
      // else {
      //   // 스토리지 초기화 테스트 코드
      //   localStorage.setItem('log_date',"DELELTE DATE")
      // }
    }
  },
  mounted() {
    this.checkChrome()
    this.pushWebLog()
  }
}
</script>
