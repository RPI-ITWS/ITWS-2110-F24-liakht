// Global variables
WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"

getRateData()

// Utilized this function to convert Unix to regular time (from lab3)
// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript 
function UnixToTime(unix_timestamp) {
   var date = new Date(unix_timestamp * 1000);
   var hours = date.getHours();
   var minutes = "0" + date.getMinutes();
   var seconds = "0" + date.getSeconds();
   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

   return formattedTime
}

// Retrieve information for stocks
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
   const currency1Rate = parseFloat(document.getElementById('currency1').value);
   const currency2Rate = parseFloat(document.getElementById('currency2').value);

   const multiplier = currency2Rate / currency1Rate;

   document.getElementById('rateDifference').textContent = "Rate Multiplier: " + rateDifference.toFixed(4);
}

