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
   document.getElementById("userLocationAllowed").innerHTML = "User location found using HTML5 Geolocation API!"
}

// Populate earth data
function getEarthWeather() {
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
      document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude
      document.getElementById("userLocationAllowed").innerHTML = "User location not allowed, please enable."
   }

   url="https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&appid=" + WEATHER_API_KEY
   fetch(url)
      .then(response => response.json())
      .then(data => {
         insertEarthWeatherData(data)
         retrieveEarthWeatherData()
         // document.getElementById("overall").innerHTML = "Overall: " + data.weather[0].main
         // document.getElementById("description").innerHTML = "Desc: " + data.weather[0].description
         // document.getElementById("windSpeed").innerHTML = "Wind: " + data["wind"].speed + " m/s"
         // document.getElementById("sunrise").innerHTML = "Sunrise: " + UnixToTime(data["sys"].sunrise)
         // document.getElementById("sunset").innerHTML = "Sunset: " + UnixToTime(data["sys"].sunset)
      });
}

function insertEarthWeatherData (data) {
   fetch('insert_earth.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
         overall: data.weather[0].main,
         description: data.weather[0].description,
         windSpeed: data.wind.speed,
         sunrise: data.sys.sunrise,
         sunset: data.sys.sunset
      })
   });
}

function retrieveEarthWeatherData() {
   fetch('retrieve_earth.php') 
      .then(response => response.json())
      .then(data => {
         if (data.error) {
            console.error("No earth weather data available")
         } else {
            document.getElementById("overall").innerHTML = "Overall: " + data.overall;
            document.getElementById("description").innerHTML = "Description: " + data.description;
            document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.wind_speed + " m/s";
            document.getElementById("sunrise").innerHTML = "Sunrise: " + UnixToTime(data.sunrise);
            document.getElementById("sunset").innerHTML = "Sunset: " + UnixToTime(data.sunset);
         }
      })
      .catch(error => {
         console.error('Error retrieving data:', error);
      });
}

// Populate mars data
function getMarsWeather() {
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
      document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude
      document.getElementById("userLocationAllowed").innerHTML = "User location not allowed, please enable."
   }
   url = "https://api.nasa.gov/insight_weather/?api_key=" + NASA_API_KEY + "&feedtype=json&ver=1.0"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         const latestSol = data.sol_keys[data.sol_keys.length - 1]; 
         const marsData = data[latestSol];
         insertMarsWeatherData(marsData)
         retrieveMarsWeatherData()
         // document.getElementById('season').innerHTML = "Current: " + marsData.Season;
         // document.getElementById('northSeason').innerHTML = "North: " + marsData.Northern_season;
         // document.getElementById('southSeason').innerHTML = "South: " + marsData.Southern_season;
         // document.getElementById('averageTemp').innerHTML = "Temp: " + marsData.AT.av + " °C";
         // document.getElementById('atmosphericPressure').innerHTML = "Pres: " + marsData.PRE.av + " Pa";
         // document.getElementById('marsWindSpeed').innerHTML = "Wind: " + marsData.HWS.av + " m/s";
      });
}


function insertMarsWeatherData (marsData) {
   fetch('insert_mars.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
         season: marsData.Season,
         northSeason: marsData.Northern_season,
         southSeason: marsData.Southern_season,
         averageTemp: marsData.AT.av,
         atmosphericPressure: marsData.PRE.av,
         marsWindSpeed: marsData.HWS.av
      })
   });
}

function retrieveMarsWeatherData() {
   fetch('retrieve_mars.php') 
      .then(response => response.json())
      .then(data => {
         if (data.error) {
            console.error("No mars weather data available")
         } else {
            document.getElementById('season').innerHTML = "Current: " + data.Season;
            document.getElementById('northSeason').innerHTML = "North: " + data.northSeason;
            document.getElementById('southSeason').innerHTML = "South: " + data.southSeason;
            document.getElementById('averageTemp').innerHTML = "Temp: " + data.averageTemp + " °C";
            document.getElementById('atmosphericPressure').innerHTML = "Pres: " + data.atmosphericPressure + " Pa";
            document.getElementById('marsWindSpeed').innerHTML = "Wind: " + data.marsWindSpeed + " m/s";
         }
      })
      .catch(error => {
         console.error('Error retrieving data:', error);
      });
}
