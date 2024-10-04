document.getElementById('refreshEarthWeatherBtn').addEventListener('click', getEarthWeather);
document.getElementById('refreshMarsWeatherBtn').addEventListener('click', getMarsWeather);
document.getElementById('previousMars').addEventListener('click', decrementMars);
document.getElementById('nextMars').addEventListener('click', incrementMars);

// Selection checkboxes
document.getElementById('showEarthConditions').addEventListener('change', toggleEarthConditions);
document.getElementById('showEarthWeather').addEventListener('change', toggleEarthWeather);
document.getElementById('showMarsSeasons').addEventListener('change', toggleMarsSeasons);
document.getElementById('showMarsWeather').addEventListener('change', toggleMarsWeather);

WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"
userLatitude = 42.7284
userLongitude = 73.6918
userApproved = false
currentMarsIndex = -1
maxMarsIndex = -1

getLocationRequest()
getEarthWeather();
getMarsWeather();

toggleEarthConditions();
toggleEarthWeather();
toggleMarsSeasons();
toggleMarsWeather();

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
async function getEarthWeather() {
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
         .then(() => {
            retrieveEarthWeatherData()
         })
      });
}

async function insertEarthWeatherData (data) {
   await fetch('insert_earth.php', {
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

async function retrieveEarthWeatherData() {
   await fetch('retrieve_earth.php') 
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
         // Out of bounds check
         if (currentMarsIndex < 0 || currentMarsIndex > data.sol_keys.length - 1) {
            currentMarsIndex = data.sol_keys.length - 1
            maxMarsIndex = data.sol_keys.length - 1
         }

         console.log(currentMarsIndex)
         console.log(data)
         
         const sol = data.sol_keys[currentMarsIndex]; 
         const marsData = data[sol];
         document.getElementById('currentSol').innerHTML = "Current Sol: " + currentMarsIndex
         insertMarsWeatherData(marsData)
         .then(() => {
            retrieveMarsWeatherData();
            updateMarsButtons();
         })
      });
}


async function insertMarsWeatherData (marsData) {
   await fetch('insert_mars.php', {
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

async function retrieveMarsWeatherData() {
   await fetch('retrieve_mars.php') 
      .then(response => response.json())
      .then(data => {
         if (data.error) {
            console.error("No mars weather data available")
         } else {
            document.getElementById('season').innerHTML = "Current: " + data.season;
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


function updateMarsButtons() {
   const previousButton = document.getElementById('previousMars');
   const nextButton = document.getElementById('nextMars');

   // Disable prev if at the first sol
   if (currentMarsIndex <= 0) {
      previousButton.disabled = true;
   } else {
      previousButton.disabled = false;
   }

   // Disable next if at the last sol
   if (currentMarsIndex >= maxMarsIndex) {
      nextButton.disabled = true;
   } else {
      nextButton.disabled = false;
   }
}

function decrementMars() {
   if (currentMarsIndex > 0) {
      currentMarsIndex -= 1;
      getMarsWeather();
   }
   updateMarsButtons(); 
}

function incrementMars() {
   if (currentMarsIndex < maxMarsIndex) {
      currentMarsIndex += 1;
      getMarsWeather();
   }
   updateMarsButtons(); 
}

function toggleEarthConditions() {
   const isVisible = document.getElementById('showEarthConditions').checked;
   document.getElementById('earthConditions').style.display = isVisible ? 'block' : 'none';
   console.log("A")
}

function toggleEarthWeather() {
   const isVisible = document.getElementById('showEarthWeather').checked;
   document.getElementById('earthWeather').style.display = isVisible ? 'block' : 'none';
}

function toggleMarsSeasons() {
   const isVisible = document.getElementById('showMarsSeasons').checked;
   document.getElementById('marsSeasons').style.display = isVisible ? 'block' : 'none';
}

function toggleMarsWeather() {
   const isVisible = document.getElementById('showMarsWeather').checked;
   document.getElementById('marsWeather').style.display = isVisible ? 'block' : 'none';
}