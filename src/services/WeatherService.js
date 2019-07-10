const weatherAPI = "fb745519f6b8d9130558572774f3ee74";

const weatherInfo = {
  "clear sky" : "맑음",
  "few clouds" : "구름 조금",
  "scattered clouds" : "구름 많음",
  "broken clouds" : "흐림",
  "shower rain" : "소나기",
  "rain" : "비",
  "thunderstorm" : "뇌우",
  "snow" : "눈",
  "mist" : "안개"
}

var lat = 37.511168000000005;
var lon = 127.029248;

function loadJSON(callback) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+weatherAPI;
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == "200") {
        callback(request.responseText);
      }
    };

    request.send(null);
  }

export default {
  getLocation() {
    var result = {}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      }, function(error) {
        console.error(error)
      }, {
        enableHighAccuracy : false,
        maximumAge : 0,
        timeout : Infinity
      });
    }
    else {
      console.log("GPS를 지원하지 않습니다.");
    }
    return result;
  },

  getWeather() {
    var weather = {};
    loadJSON(function(response) {
      var weatherData = JSON.parse(response);

      weather.temp = Math.round((weatherData.main.temp - 273.15)*10)/10 + "˚C";
      weather.temp_max = Math.round((weatherData.main.temp_max - 273.15)*10)/10 + "˚C";
      weather.temp_min = Math.round((weatherData.main.temp_min - 273.15)*10)/10 + "˚C";
      weather.desc = weatherData.weather[0].description;
      weather.icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      weather.humidity = weatherData.main.humidity + "%";
    })
    return weather;
  }


}
