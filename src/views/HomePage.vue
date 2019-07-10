<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em; font-size:3.3vw;" slot="text">We will find a way.<br> We always have.</div>
    </ImgBanner>
    <v-container>
      <!-- About Me -->
      <v-layout my-5>
        <v-flex class="text-xs-center text-md-left" sm12 md8>
          <h2 class="headline mb-3">About Me</h2>
          <p class="mr-4"></p>
        </v-flex>
        <v-flex xs4  hidden-sm-and-down>
          <v-img :src="getImgUrl('profile.png')" aspect-ratio="1.5"/>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
          <PortfolioList></PortfolioList>
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
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import firebase from 'firebase' 

export default {
	name: 'HomePage',
	components: {
		ImgBanner,
		PortfolioList,
		PostList,
		RepositoryList
	},
	methods: {
		getImgUrl(img) {
			return require('../assets/' + img)
    },
    pushWebLog(){
      const date_time = new Date();
      const log = {
        date_time : date_time,
      }
      // firebase.database().ref("log").push(log)
      //    .then((data)=>{
      //     alert(data);
      //     commit('createdLog', log);
      //   })
      //   .catch((error)=>{
      //     alert(error);
      //   })
    }
  },
  created() {
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if(isChrome == false) {
      this.$swal({
          type: 'error',
          title: 'Oops...',
          text: '해당 사이트는 크롬에 최적화되어있습니다. 정상적으로 작동하지 않을 수 있습니다.'
      });
    }
    this.pushWebLog()
  }
}
</script>
