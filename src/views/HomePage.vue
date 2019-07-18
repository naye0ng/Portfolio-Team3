<template>
  <div>
    <!-- <DeveloperList imgSrc="https://source.unsplash.com/random/1600x900"/> -->
    <DeveloperList />
    <!-- <v-container> -->
    <!-- About Me -->
    <div class="contents">
      <v-layout column py-5 my-1 id="aboutUs">
        <v-flex xs12 mt-3 py-1>
          <h2 class="my-2 text-xs-center homepage-title">ABOUT US</h2>
        </v-flex>
        <v-container py-1>
          <v-flex class="text-xs-center" xs12 hidden-sm-and-down>
            <v-img :src="getImgUrl('profile.png')" aspect-ratio="2">
              <AboutUs></AboutUs>
            </v-img>
          </v-flex>
          <v-flex class="text-xs-center" xs12 hidden-md-and-up>
            <AboutUs></AboutUs>
          </v-flex>
        </v-container>
      </v-layout>
    </div>

    <!-- Portfolio -->
    <div class="contents star-bg">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <v-layout py-5 mt-4 row wrap class="grey lighten-5" id="portfolio">
        <v-flex pt-3 pb-1 xs12 style="z-index:99">
          <h2 class="mt-4 pt-3 text-xs-center homepage-title text-white">PORTFOLIO</h2>
        </v-flex>
        <v-container class="pt-0">
          <v-flex xs12>
            <PortfolioList></PortfolioList>
            <!-- <PortList2></PortList2> -->
          </v-flex>
          <v-flex style="z-index:99;position:relative;" xs12 text-xs-center mb-3 mt-5>
            <v-btn color="#EC407A" dark to="/portfolio">
              <v-icon size="25" class="mr-2">fa-plus</v-icon>Portfolio 더보기
            </v-btn>
          </v-flex>
        </v-container>
      </v-layout>
    </div>

    <!-- Post -->
    <div class="contents">
      <v-layout py-5 mt-1 row wrap id="post">
        <v-flex pt-3 xs12>
          <h2 class="mb-5 mt-3 text-xs-center homepage-title">POST</h2>
        </v-flex>
        <v-flex xs12>
          <PostList :column="1"></PostList>
        </v-flex>
        <v-flex xs12 text-xs-center my-4>
          <v-btn color="#EC407A" dark to="/post" class="mt-3">
            <v-icon size="25" class="mr-2">fa-plus</v-icon>Post 더보기
          </v-btn>
        </v-flex>
      </v-layout>
    </div>

    <!-- Github -->
    <div class="contents star-bg">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <v-layout py-5 mt-1 row wrap class="grey lighten-5" id="github">
        <v-flex pt-3 xs12 style="z-index:99">
          <h2 class="my-4 pb-4 text-xs-center homepage-title text-white">PROJECT</h2>
        </v-flex>
        <!-- <v-container py-3> -->
        <v-flex xs12 class="cal-padding">
          <RepositoryList style="z-index:99"></RepositoryList>
        </v-flex>
        <!-- </v-container> -->
      </v-layout>
    </div>
    <!-- </v-container> -->
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";
import firebase from "firebase";
import DeveloperList from "../components/hyunah/DeveloperList";
import AboutUs from "../components/hyunah/AboutUs";
import PortList2 from "../components/PortList2";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    DeveloperList,
    AboutUs,
    PortList2
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    checkChrome() {
      var isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      if (isChrome == false) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text:
            "해당 사이트는 크롬에 최적화되어있습니다. 정상적으로 작동하지 않을 수 있습니다."
        });
      }
    },
    pushWebLog() {
      var date_time = new Date();
      var date = date_time.toDateString();

      if (this.$store.state.date != date) {
        var log = {};
        log.date_time = date_time.toString();
        log.user =
          this.$store.state.user === null ? "" : this.$store.state.user.email;
        this.$store.state.date = date;
        this.$store.state.key = firebase
          .database()
          .ref()
          .child("logs")
          .child(date)
          .push(log).key;
        localStorage.setItem("log_date", this.$store.state.date);
        localStorage.setItem("log_key", this.$store.state.key);
      }
      // else {
      //   // 스토리지 초기화 테스트 코드
      //   localStorage.setItem('log_date',"DELELTE DATE")
      // }
    }
  },
  mounted() {
    this.checkChrome();
    this.pushWebLog();
  }
};

window.onload = function() {
  var current = 0;
  $(document).keydown(function(event) {
    var aboutUs = $("#aboutUs").offset().top;
    var post = $("#post").offset().top;
    var portfolio = $("#portfolio").offset().top;
    var github = $("#github").offset().top;
    var positions = [0, aboutUs, portfolio, post, github];

    if (event.keyCode == "38") {
      if (current >= 0) {
        current -= 1;
        $("html, body").animate({ scrollTop: positions[current] }, 400);
      }
    } else if (event.keyCode == "40") {
      if (current <= 3) {
        current += 1;
        $("html, body").animate({ scrollTop: positions[current] }, 400);
      }
    }
  });
};
</script>

<style>
.homepage-title {
  font-family: "Do Hyeon", sans-serif;
  font-size: 3.5em;
  letter-spacing: 0.1em;
  text-shadow: 0.1em 0px #ec407a;
}
.contents {
  min-height: 100%;
}
.star-bg {
  position: relative;
}
.twinkling {
  z-index: 1;
  position: absolute;
}
.text-white {
  color: #fff;
}
.cal-padding {
  padding: 0 10%;
}
@media (max-width: 991px) {
  .cal-padding {
    padding: 0 5%;
  }
}
@media (max-width: 576px) {
  .cal-padding {
    padding: 0 2%;
  }
}
</style>
