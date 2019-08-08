import axios from 'axios'
import firebase from "firebase";

function getWeather(lat, lon, {commit}) {
  // 저장된 API KEY 값과 위도, 경도를 사용하여 url을 가져옴.
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + lon + "&appid=fb745519f6b8d9130558572774f3ee74";

  axios
  .get(url)
  .then(response => {
    // weather에 저장한 후,
    var weather = {
      'temp' : Math.round((response.data.main.temp - 273.15)*10)/10 + "˚C",
      'tempMin' : Math.round((response.data.main.temp_min - 273.15)*10)/10 + "˚C",
      'tempMax' : Math.round((response.data.main.temp_max - 273.15)*10)/10 + "˚C",
      'desc' : response.data.weather[0].description,
      'icon' : "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png",
      'hum' : response.data.main.humidity + "%"
    }
    // commit을 사용해 mutations을 통해 등록한다.
    commit('setWeather', weather);
  })
  .catch(error => {
    console.log(error);
  });
}

export default {
  initWeather({commit}, payload) {
    if(navigator.geolocation) {
      // 날씨정보를 가져와 vuex에 저장하는 부분.
      navigator.geolocation.getCurrentPosition(position => {
        // 위치 정보 허용한 경우.

        // 위도와 경도값을 받아온다.
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeather(lat, lon, {commit});
      }, error => {
        // 위치 정보 허용 안함. - 기본값[역삼]
        getWeather(37.5108295, 127.02928809999999, {commit});
      })
    }
    else {
      // navigator.geolocation 사용 불가 브라우져
      getWeather(37.5108295, 127.02928809999999, {commit});
    }

  },
  checkUserStatus({commit,state}){
    // User 상태 계속 확인해서, 유저 업데이트 해주기
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('SET_USER', user);
          resolve(user);
          firebase.database().ref("user").child(user.email.split('@')[0]).once("value")
            .then(snapshot => {
              commit('setDBUser', snapshot.val())
          })
        }
        else{
          commit('SET_USER',null);
          resolve(user);
        }
      });
    });
  },
}
