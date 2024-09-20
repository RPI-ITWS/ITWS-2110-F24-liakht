// function buttonClicked(type, article, section) {
//    $.ajax({
//       type: "GET",
//       url: "https://api.unsplash.com/photos/random",
//       headers: {
//          Authorization: "JefegJVPwoX-JXK0Rw8DrEsqy-EZT--Ol9uOa6HSMg0"
//       },      
//       dataType: "json",
//       success: function (responseData, status) {
//          //responseData[articles/amendments][article/amendment index].sections[section index].interpretation
//          // let output = responseData[type][article-1].sections[section-1].interpretation;
//          // $('#interpretationContent').html(output);
//          console.log(responseData)
//       }, error: function (msg) {
//          // there was a problem
//          alert("There was a problem: " + msg.status + " " + msg.statusText);
//       }
//    });
// }

document.getElementById('getEarthWeatherBtn').addEventListener('click', getEarthWeather);
document.getElementById('getMarsWeatherBtn').addEventListener('click', getMarsWeather);
document.getElementById('getLocationBtn').addEventListener('click', getLocation);

WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"
userLatitude = -1
userLongitude = -1

getLocationRequest()

// Taken from https://www.w3schools.com/jsref/prop_nav_geolocation.asp tutorial
function getLocationRequest() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation);
   } 
   else {
      alert("Geolocation is not supported by this browser.");
   }
}

function UnixToTime(unix_timestamp) {
   var date = new Date(unix_timestamp * 1000);
   var hours = date.getHours();
   var minutes = "0" + date.getMinutes();
   var seconds = "0" + date.getSeconds();
   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

   return formattedTime
}

function getLocation(position) {
   userLatitude = position.coords?.latitude
   userLongitude = position.coords?.longitude
   document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
   document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude
}

function getEarthWeather() {
   url="https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&appid=" + WEATHER_API_KEY
   fetch(url)
      .then(response => response.json())
      .then(data => {
         document.getElementById("overall").innerHTML = "Overall: " + data.weather[0].main
         document.getElementById("description").innerHTML = "Description: " + data.weather[0].description
         document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data["wind"].speed
         document.getElementById("sunrise").innerHTML = "Sunrise: " + UnixToTime(data["sys"].sunrise)
         document.getElementById("sunset").innerHTML = "Sunset: " + UnixToTime(data["sys"].sunset)
      });
}

function getMarsWeather() {
   url = "https://api.nasa.gov/insight_weather/?api_key=" + NASA_API_KEY + "&feedtype=json&ver=1.0"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         const latestSol = data.sol_keys[data.sol_keys.length - 1]; 
         const marsData = data[latestSol];

         document.getElementById('season').innerHTML = "Season: " + marsData.Season;
         document.getElementById('northSeason').innerHTML = "North Season: " + marsData.Northern_season;
         document.getElementById('southSeason').innerHTML = "South Season: " + marsData.Southern_season;
         document.getElementById('averageTemp').innerHTML = "Average Temperature: " + marsData.AT.av + " °C";
         document.getElementById('atmosphericPressure').innerHTML = "Atmospheric Pressure: " + marsData.PRE.av + " Pa";
         document.getElementById('marsWindSpeed').innerHTML = "Wind Speed: " + marsData.HWS.av + " m/s";
      });
}
