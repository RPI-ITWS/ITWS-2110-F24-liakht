document.getElementById('refreshEarthWeatherBtn').addEventListener('click', getEarthWeather);
document.getElementById('refreshMarsWeatherBtn').addEventListener('click', getMarsWeather);

WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"
userLatitude = 42.7284
userLongitude = 73.6918
userApproved = false

getLocationRequest()

// Learned from https://www.w3schools.com/jsref/prop_nav_geolocation.asp tutorial
function getLocationRequest() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation);
   } 
   else {
      // User did not accept, default to troy coordinates
      getEarthWeather();
      getMarsWeather();
   }
}

// Utilized this function to convert Unix to regular time
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript 
function UnixToTime(unix_timestamp) {
   var date = new Date(unix_timestamp * 1000);
   var hours = date.getHours();
   var minutes = "0" + date.getMinutes();
   var seconds = "0" + date.getSeconds();
   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

   return formattedTime
}

// User accepted location
function getLocation(position) {
   if (userApproved) {
      return
   }
   userApproved = true
   userLatitude = position.coords?.latitude
   userLongitude = position.coords?.longitude
   document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
   document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude

   getEarthWeather();
   getMarsWeather();
}

// Populate earth data
function getEarthWeather() {
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Did not allow access to location, defaulting to troy. Refresh to try again"
      document.getElementById("longitude").innerHTML = ""
   }

   url="https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&appid=" + WEATHER_API_KEY
   fetch(url)
      .then(response => response.json())
      .then(data => {
         document.getElementById("overall").innerHTML = "Overall: " + data.weather[0].main
         document.getElementById("description").innerHTML = "Desc: " + data.weather[0].description
         document.getElementById("windSpeed").innerHTML = "Wind: " + data["wind"].speed + " m/s"
         document.getElementById("sunrise").innerHTML = "Sunrise: " + UnixToTime(data["sys"].sunrise)
         document.getElementById("sunset").innerHTML = "Sunset: " + UnixToTime(data["sys"].sunset)
      });
}

// Populate mars data
function getMarsWeather() {
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Did not allow access to location, defaulting to troy. Refresh to try again"
      document.getElementById("longitude").innerHTML = ""
   }
   url = "https://api.nasa.gov/insight_weather/?api_key=" + NASA_API_KEY + "&feedtype=json&ver=1.0"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         const latestSol = data.sol_keys[data.sol_keys.length - 1]; 
         const marsData = data[latestSol];

         document.getElementById('season').innerHTML = "Current: " + marsData.Season;
         document.getElementById('northSeason').innerHTML = "North: " + marsData.Northern_season;
         document.getElementById('southSeason').innerHTML = "South: " + marsData.Southern_season;
         document.getElementById('averageTemp').innerHTML = "Temp: " + marsData.AT.av + " °C";
         document.getElementById('atmosphericPressure').innerHTML = "Pres: " + marsData.PRE.av + " Pa";
         document.getElementById('marsWindSpeed').innerHTML = "Wind: " + marsData.HWS.av + " m/s";
      });
}
