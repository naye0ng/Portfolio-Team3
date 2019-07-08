export default {
  getLocation() {
    var result = {}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude + ' ' + position.coords.longitude);
        result.lat = position.coords.latitude;
        result.lon = position.coords.longitude;
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
      result.lat = 37.511168000000005;
      result.lon = 127.029248;
    }
    return result;
  }
}
