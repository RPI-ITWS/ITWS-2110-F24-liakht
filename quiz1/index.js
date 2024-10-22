// Global variables
WEATHER_API_KEY = "794fd5d12fde6943bd7508fb8437bbb8"
NASA_API_KEY = "Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd"

getRateData()

// Retrieve information for stocks
function getRateData() {
   // Get data from API
   url="https://api.frankfurter.app/latest?base=USD"
   fetch(url)
      .then(response => response.json())
      .then(data => {
         insertRateData(data)
      });
}

async function insertRateData (data) {
   console.log(data)
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

