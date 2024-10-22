// Replace these with your actual API keys
WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"

const defaultLatitude = 42.7284;
const defaultLongitude = 73.6918;

document.getElementById('refreshEarthWeatherBtn').addEventListener('click', getEarthWeather);
document.getElementById('refreshMarsWeatherBtn').addEventListener('click', getMarsWeather);

window.onload = function () {
   getEarthWeather();
   getMarsWeather();
   getRateData()

};

function getEarthWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${defaultLatitude}&lon=${defaultLongitude}&appid=${WEATHER_API_KEY}&units=metric`;

   fetch(url)
      .then(response => response.json())
      .then(data => {
         document.getElementById("overall").innerHTML = "Overall: " + data.weather[0].main;
         document.getElementById("description").innerHTML = "Description: " + data.weather[0].description;
         document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.wind.speed + " m/s";
         document.getElementById("sunrise").innerHTML = "Sunrise: " + UnixToTime(data.sys.sunrise);
         document.getElementById("sunset").innerHTML = "Sunset: " + UnixToTime(data.sys.sunset);
      })
      .catch(error => {
         console.error("Error fetching Earth weather:", error);
      });
}

function getMarsWeather() {
   const url = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;

   fetch(url)
      .then(response => response.json())
      .then(data => {
         const sols = data.sol_keys;
         const sol = sols[sols.length - 1];  
         const marsData = data[sol];

         document.getElementById("season").innerHTML = "Current Season: " + marsData.Season;
         document.getElementById("northSeason").innerHTML = "Northern Season: " + marsData.Northern_season;
         document.getElementById("southSeason").innerHTML = "Southern Season: " + marsData.Southern_season;
         document.getElementById("averageTemp").innerHTML = "Average Temp: " + marsData.AT.av + " °C";
         document.getElementById("atmosphericPressure").innerHTML = "Pressure: " + marsData.PRE.av + " Pa";
         document.getElementById("marsWindSpeed").innerHTML = "Wind Speed: " + marsData.HWS.av + " m/s";
      })
      .catch(error => {
         console.error("Error fetching Mars weather:", error);
      });
}

function UnixToTime(unix_timestamp) {
   const date = new Date(unix_timestamp * 1000);
   const hours = date.getHours();
   const minutes = "0" + date.getMinutes();
   return hours + ':' + minutes.substr(-2);
}


function getRateData() {
   // Get data from API
   url="https://api.frankfurter.app/latest?base=USD"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         insertRateData(data)
         .then(() => {
            // Retrieve data from SQL
            retrieveRateData()
         })
      });
}


async function insertRateData (data) {
   await fetch('./insert_rate.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
         amount: data.amount,
         base: data.base,
         date: data.date,
         rates: JSON.stringify(data.rates)
      })
   });
}

async function retrieveRateData () {
   await fetch('retrieve_rate.php')
      .then(response => response.json())
      .then(data => {
         populateDropdowns(data)
         generateTable(data);
      })
      .catch(error => {
         console.error('Error getting rate data:', error);
      });
}

function generateTable(data) {
   // check for safety
   if(data.length <= 0) {
      return
   }

   document.getElementById('amount').textContent = "Amount: " + data[0].amount;
   document.getElementById('base').textContent = "Base: " + data[0].base;
   document.getElementById('date').textContent = "Date: " + data[0].date;
   const tableBody = document.querySelector("#exchangeRatesTable tbody");

   data.forEach(item => {
      // New row
      const row = document.createElement("tr");

      const currencyCell = document.createElement("td");
      currencyCell.textContent = item.currency;
      row.appendChild(currencyCell);

      const rateCell = document.createElement("td");
      rateCell.textContent = item.rate;
      row.appendChild(rateCell);

      // Add row
      tableBody.appendChild(row);
   });
}


function populateDropdowns(data) {
   console.log(data)
   const currency1Dropdown = document.getElementById('currency1');
   const currency2Dropdown = document.getElementById('currency2');

   data.forEach(item => {
      const option1 = document.createElement('option');
      option1.value = item.rate;
      option1.textContent = item.currency;
      currency1Dropdown.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = item.rate;
      option2.textContent = item.currency;
      currency2Dropdown.appendChild(option2);
   });
}

// Rate diff
function calculateRateDifference() {
   const currency1Dropdown = document.getElementById('currency1');
   const currency2Dropdown = document.getElementById('currency2');

   const currency1Rate = parseFloat(document.getElementById('currency1').value);
   const currency2Rate = parseFloat(document.getElementById('currency2').value);
   const currency1Name = currency1Dropdown.selectedOptions[0].textContent;
   const currency2Name = currency2Dropdown.selectedOptions[0].textContent;

   const multiplier = currency2Rate / currency1Rate;

   document.getElementById('currency1Value').textContent = currency1Name + ": " + currency1Rate
   document.getElementById('currency2Value').textContent = currency2Name + ": " + currency2Rate
   document.getElementById('rateDifference').textContent = "Rate Multiplier: " + multiplier.toFixed(4);
}

