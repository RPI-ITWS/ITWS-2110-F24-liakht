// Refresh buttons
document.getElementById('refreshEarthWeatherBtn').addEventListener('click', getEarthWeather);
document.getElementById('refreshMarsWeatherBtn').addEventListener('click', getMarsWeather);

// Mars sol increase / previous
document.getElementById('previousMars').addEventListener('click', decrementMars);
document.getElementById('nextMars').addEventListener('click', incrementMars);

// Selection checkboxes for what information to display
document.getElementById('showEarthConditions').addEventListener('change', toggleEarthConditions);
document.getElementById('showEarthWeather').addEventListener('change', toggleEarthWeather);
document.getElementById('showMarsSeasons').addEventListener('change', toggleMarsSeasons);
document.getElementById('showMarsWeather').addEventListener('change', toggleMarsWeather);

// Global variables
WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"
const encryptionKey = "HH3jKF5dPrxR5omR"
userLatitude = 42.7284
userLongitude = 73.6918
userApproved = false
currentMarsIndex = -1
maxMarsIndex = -1


// On load... request user location, get earth and mars daa
getLocationRequest()
getEarthWeather();
getMarsWeather();

// Verify default selections
toggleEarthConditions();
toggleEarthWeather();
toggleMarsSeasons();
toggleMarsWeather();



function encryptData(data) {
   return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
}

function decryptData(encryptedData) {
   const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Learned from https://www.w3schools.com/jsref/prop_nav_geolocation.asp tutorial
// Request the users geo location
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
   // User did not approve
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
      document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude
      document.getElementById("userLocationAllowed").innerHTML = "User location not allowed, please enable."
   }

   // Get data from API
   url="https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&appid=" + WEATHER_API_KEY
   fetch(url)
      .then(response => response.json())
      .then(data => {
         // Insert data into SQL
         insertEarthWeatherData(data)
         .then(() => {
            // Retrieve data from SQL
            retrieveEarthWeatherData()
         })
      });
}

// Given data from the API, sends it to PHP to insert into SQL
async function insertEarthWeatherData (data) {
   await fetch('insert_earth.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
         overall: encryptData(data.weather[0].main),
         description: encryptData(data.weather[0].description),
         windSpeed: encryptData(data.wind.speed),
         sunrise: data.sys.sunrise,
         sunset: data.sys.sunset
      })
   });
}

// Retrieves data from SQL using PHP, sets elements on HTML
async function retrieveEarthWeatherData() {
   // PHP call
   await fetch('retrieve_earth.php') 
      .then(response => response.json())
      .then(data => {
         if (data.error) {
            console.error("No earth weather data available")
         } else {
            // Populate HTML
            document.getElementById("overall").innerHTML = "Overall: " + decryptData(data.overall);
            document.getElementById("description").innerHTML = "Description: " + decryptData(data.description);
            document.getElementById("windSpeed").innerHTML = "Wind Speed: " + decryptData(data.wind_speed) + " m/s";
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
   // User did not approve location
   if(!userApproved) {
      document.getElementById("latitude").innerHTML = "Longitude: " + userLatitude
      document.getElementById("longitude").innerHTML = "Latitude: " + userLongitude
      document.getElementById("userLocationAllowed").innerHTML = "User location not allowed, please enable."
   }

   // Fetch API data
   url = "https://api.nasa.gov/insight_weather/?api_key=" + NASA_API_KEY + "&feedtype=json&ver=1.0"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         // Out of bounds check for sol selection
         if (currentMarsIndex < 0 || currentMarsIndex > data.sol_keys.length - 1) {
            currentMarsIndex = data.sol_keys.length - 1
            maxMarsIndex = data.sol_keys.length - 1
         }
         
         // Sol specific data to store in SQL
         const sol = data.sol_keys[currentMarsIndex]; 
         const marsData = data[sol];
         document.getElementById('currentSol').innerHTML = "Sol: " + currentMarsIndex

         // Store in SQL
         insertMarsWeatherData(marsData)
         .then(() => {
            // Retrieve from SQL
            retrieveMarsWeatherData();
            updateMarsButtons();
         })
      });
}

// Given API data, store it in SQL using PHP
async function insertMarsWeatherData (marsData) {
   await fetch('insert_mars.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
         season: marsData.Season,
         northSeason: encryptData(marsData.Northern_season),
         southSeason: encryptData(marsData.Southern_season),
         averageTemp: encryptData(marsData.AT.av),
         atmosphericPressure: encryptData(marsData.PRE.av),
         marsWindSpeed: encryptData(marsData.HWS.av)
      })
   });
}

// Retrieves SQL data and populated HTML
async function retrieveMarsWeatherData() {
   // fetch data
   await fetch('retrieve_mars.php') 
      .then(response => response.json())
      .then(data => {
         if (data.error) {
            console.error("No mars weather data available")
         } else {
            // Populate HTML
            document.getElementById('season').innerHTML = "Current: " + decryptData(data.season);
            document.getElementById('northSeason').innerHTML = "North: " + decryptData(data.northSeason);
            document.getElementById('southSeason').innerHTML = "South: " + decryptData(data.southSeason);
            document.getElementById('averageTemp').innerHTML = "Temp: " + decryptData(data.averageTemp) + " °C";
            document.getElementById('atmosphericPressure').innerHTML = "Pres: " + decryptData(data.atmosphericPressure) + " Pa";
            document.getElementById('marsWindSpeed').innerHTML = "Wind: " + decryptData(data.marsWindSpeed) + " m/s";
         }
      })
      .catch(error => {
         console.error('Error retrieving data:', error);
      });
}

// Disable / enable the mars selection buttons
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

// Decrement mars sol button
function decrementMars() {
   if (currentMarsIndex > 0) {
      currentMarsIndex -= 1;
      getMarsWeather();
   }
   updateMarsButtons(); 
}

// Increment mars sol button
function incrementMars() {
   if (currentMarsIndex < maxMarsIndex) {
      currentMarsIndex += 1;
      getMarsWeather();
   }
   updateMarsButtons(); 
}

// Earth conditions toggle
function toggleEarthConditions() {
   const isVisible = document.getElementById('showEarthConditions').checked;
   document.getElementById('earthConditions').style.display = isVisible ? 'block' : 'none';
}

// Earth weather toggle
function toggleEarthWeather() {
   const isVisible = document.getElementById('showEarthWeather').checked;
   document.getElementById('earthWeather').style.display = isVisible ? 'block' : 'none';
}

// Mars seasons toggle
function toggleMarsSeasons() {
   const isVisible = document.getElementById('showMarsSeasons').checked;
   document.getElementById('marsSeasons').style.display = isVisible ? 'block' : 'none';
}

// Mars weather toggle
function toggleMarsWeather() {
   const isVisible = document.getElementById('showMarsWeather').checked;
   document.getElementById('marsWeather').style.display = isVisible ? 'block' : 'none';
}