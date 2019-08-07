<template>
  <div>
    <DeveloperList />
    <div class="contents">
      <v-layout column py-5 my-1 id="aboutUs" style="background: #fff;">
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
    <div class="shooting-star-2">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="p p-1"></div>
      <div class="p2 p-2"></div>
      <div class="p3 p-3"></div>
      <v-layout py-5 mt-4 row wrap id="portfolio">
        <v-flex pt-3 pb-1 xs12 style="z-index:99">
          <h2 class="mt-4 pt-3 text-xs-center homepage-title text-white">PORTFOLIO</h2>
        </v-flex>
        <v-container class="pt-0">
          <v-flex xs12>
            <PortfolioList></PortfolioList>
          </v-flex>
          <v-flex class="bg-3" style="z-index:99;position:relative;" xs12 text-xs-center mb-3 mt-5>
            <div>
              <router-link to="/portfolio">
                <button
                  class="button button--wayra button--border-medium button--text-medium button--size-s"
                >PORTFOLIO 더보기</button>
              </router-link>
            </div>
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
        <v-flex xs12 text-xs-center my-4 class="bg-1">
          <div>
            <router-link to="/post">
              <button
                class="button button--wayra button--border-medium button--text-medium button--size-s"
              >POST 더보기</button>
            </router-link>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <!-- Github -->
    <div class="contents star-bg">
      <div class="shooting-star-2">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="p p-1"></div>
        <div class="p2 p-2"></div>
        <div class="p3 p-3"></div>
        <v-layout py-5 mt-1 row wrap id="github">
          <v-flex pt-3 xs12 style="z-index:99">
            <h2 class="my-4 pb-4 text-xs-center homepage-title text-white">PROJECT</h2>
          </v-flex>
          <v-flex xs12 class="cal-padding">
            <RepositoryList style="z-index:99"></RepositoryList>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
import ImgBanner from "../components/template/ImgBanner";
import PortfolioList from "../components/portfolio/PortfolioList";
import PostList from "../components/post/PostList";
import RepositoryList from "../components/repository/RepositoryList";
import firebase from "firebase";
import DeveloperList from "../components/template/DeveloperList";
import AboutUs from "../components/template/AboutUs";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    DeveloperList,
    AboutUs,
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
    },
    Scrolling() {
      var current = 0;
      $(document).keydown(function(event) {
        var aboutUs, post, portfolio, github;

        if($("#aboutUs").length) {
          aboutUs = $("#aboutUs").offset().top;
        }
        if($("#post").length) {
          post = $("#post").offset().top;
        }
        if($("#portfolio").length) {
          portfolio = $("#portfolio").offset().top;
        }
        if($("#github").length) {
          github = $("#github").offset().top;
        }

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
    }
  },
  mounted() {
    this.checkChrome();
    this.pushWebLog();
    this.Scrolling();
  }
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

/* @import url(https://fonts.googleapis.com/css?family=Raleway:200,300,400,500,600); */
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.button {
  /* float: left; */
  min-width: 150px;
  max-width: 230px;
  /* display: block; */
  margin: 1em;
  padding: 1em 2em;
  border: none;
  background: none;
  color: inherit;
  /* vertical-align: middle; */
  position: relative;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
}
.button:focus {
  outline: none;
}
.button > span {
  vertical-align: middle;
}
/* Text color adjustments (we could stick to the "inherit" but that does not work well in Safari) */
.bg-1 .button {
  color: #181818;
  border-color: #181818;
}
.bg-2 .button {
  color: #eceff1;
  border-color: #eceff1;
}
.bg-3 .button {
  color: #fff;
  border-color: #fff;
}
.bg-4 .button {
  color: #5349d6;
  border-color: #5349d6;
}
.bg-5 .button {
  color: #df4a31;
  border-color: #df4a31;
}
.button--border-thin {
  border: 1.5px solid;
}
.button--border-medium {
  border: 2px solid;
}
.button--border-thick {
  border: 3px solid;
}
.button--text-upper {
  letter-spacing: 2px;
  text-transform: uppercase;
}
.button--text-thin {
  font-weight: 500;
}
.button--text-medium {
  font-weight: 550;
}
.button--text-thick {
  font-weight: 550;
}
.button--size-xs {
  font-size: 13px;
}
.button--size-s {
  font-size: 16px;
}
.button--size-m {
  font-size: 17px;
}
.button--size-l {
  font-size: 19px;
}
.button--wayra,
.button--wayra2,
.button--wayra3,
.button--wayra4 {
  overflow: hidden;
  width: 245px;
  -webkit-transition: border-color 0.3s, color 0.3s;
  transition: border-color 0.3s, color 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--wayra::before,
.button--wayra2::before,
.button--wayra3::before,
.button--wayra4::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 100%;
  background: #37474f;
  z-index: -1;
  -webkit-transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
  transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
  -webkit-transform-origin: 0% 100%;
  transform-origin: 0% 100%;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s,
    background-color 0.3s;
  transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
}
.button--wayra:hover {
  color: #f7f7f7;
  border-color: #ec407a;
}
.button--wayra.button--inverted:hover {
  color: #ec407a;
  border-color: #f7f7f7;
}
.button--wayra:hover::before {
  opacity: 1;
  background-color: #ec407a;
  -webkit-transform: rotate3d(0, 0, 1, 0deg);
  transform: rotate3d(0, 0, 1, 0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--wayra.button--inverted:hover::before,
.button--wayra2.button--inverted:hover::before {
  background-color: #f7f7f7;
}

.button--wayra3.button--inverted:hover::before,
.button--wayra4.button--inverted:hover::before {
  background-color: #f7f7f7;
}

.button--wayra2:hover {
  color: #f7f7f7;
  border-color: #555a9c;
}
.button--wayra2.button--inverted:hover {
  color: #555a9c;
  border-color: #f7f7f7;
}
.button--wayra2:hover::before {
  opacity: 1;
  background-color: #555a9c;
  -webkit-transform: rotate3d(0, 0, 1, 0deg);
  transform: rotate3d(0, 0, 1, 0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.button--wayra3:hover {
  color: #f7f7f7;
  border-color: #df4a31;
}
.button--wayra3.button--inverted:hover {
  color: #df4a31;
  border-color: #f7f7f7;
}
.button--wayra3:hover::before {
  opacity: 1;
  background-color: #df4a31;
  -webkit-transform: rotate3d(0, 0, 1, 0deg);
  transform: rotate3d(0, 0, 1, 0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}

.button--wayra4:hover {
  color: #f7f7f7;
  border-color: #181818;
}
.button--wayra4.button--inverted:hover {
  color: #181818;
  border-color: #f7f7f7;
}
.button--wayra4:hover::before {
  opacity: 1;
  background-color: #181818;
  -webkit-transform: rotate3d(0, 0, 1, 0deg);
  transform: rotate3d(0, 0, 1, 0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.shooting-star-2{
  position:relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.shooting-star-2 .stars{
  z-index: 1;
}
</style>
