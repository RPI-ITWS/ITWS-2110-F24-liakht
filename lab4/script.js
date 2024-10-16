const earthWeatherBox = document.getElementById('earthWeather');
const marsWeatherBox = document.getElementById('marsWeather');

// Fetch Earth Weather Data from OpenWeatherMap API and store it
fetch('https://api.openweathermap.org/data/2.5/weather?lat=42.7284&lon=73.6918&appid=794fd5d12fde6943bd7508fb8437bbb8&units=metric')
    .then(response => response.json())
    .then(data => {
        storeEarthWeather(data);
    });

let solIndex = 0;
fetchMarsWeather(solIndex);

function fetchMarsWeather(index) {
    fetch(`https://api.nasa.gov/insight_weather/?api_key=Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd&feedtype=json&ver=1.0`)
        .then(response => response.json())
        .then(data => {
            const solKeys = data.sol_keys;
            const sol = solKeys[index];
            const marsData = data[sol];

            const northSeason = marsData.Northern_season;
            const southSeason = marsData.Southern_season;

            storeMarsWeather({
                season: marsData.Season,
                northSeason: northSeason,
                southSeason: southSeason,
                averageTemp: marsData.AT.av,
                atmosphericPressure: marsData.PRE.av,
                marsWindSpeed: marsData.HWS.av
            });
        });
}

function storeEarthWeather(data) {
    fetch('store_earth_weather.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            overall: data.weather[0].main,
            description: data.weather[0].description,
            wind_speed: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        })
    }).then(() => {
        getEarthWeatherFromDB();
    });
}

function storeMarsWeather(marsData) {
    fetch('store_mars_weather.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            season: marsData.season,
            Northern_season: marsData.northSeason,
            Southern_season: marsData.southSeason,
            averageTemp: marsData.averageTemp,
            atmosphericPressure: marsData.atmosphericPressure,
            marsWindSpeed: marsData.marsWindSpeed
        })
    }).then(() => {
        getMarsWeatherFromDB();
    });
}

function getEarthWeatherFromDB() {
    fetch('get_earth_weather.php')
        .then(response => response.json())
        .then(data => {
            if (data && Object.keys(data).length > 0) {
                document.getElementById('earth_overall').innerText = `Overall: ${data.overall}`;
                document.getElementById('earth_description').innerText = `Description: ${data.description}`;
                document.getElementById('earth_wind_speed').innerText = `Wind Speed: ${data.wind_speed} m/s`;
                document.getElementById('earth_sunrise').innerText = `Sunrise: ${new Date(data.sunrise * 1000).toLocaleTimeString()}`;
                document.getElementById('earth_sunset').innerText = `Sunset: ${new Date(data.sunset * 1000).toLocaleTimeString()}`;
            }
        });
}

function getMarsWeatherFromDB() {
    fetch('get_mars_weather.php')
        .then(response => response.json())
        .then(data => {
            if (data && Object.keys(data).length > 0) {
                document.getElementById('mars_season').innerText = `Season: ${data.season}`;
                document.getElementById('mars_north_season').innerText = `North Season: ${data.northSeason}`;
                document.getElementById('mars_south_season').innerText = `South Season: ${data.southSeason}`;
                document.getElementById('mars_avg_temp').innerText = `Avg Temp: ${data.averageTemp} °C`;
                document.getElementById('mars_atm_pressure').innerText = `Atmospheric Pressure: ${data.atmosphericPressure} Pa`;
                document.getElementById('mars_wind_speed').innerText = `Wind Speed: ${data.marsWindSpeed} m/s`;
            }
        });
}

document.getElementById('prev').addEventListener('click', () => {
    solIndex = Math.max(0, solIndex - 1);
    fetchMarsWeather(solIndex);
});

document.getElementById('next').addEventListener('click', () => {
    solIndex = Math.min(6, solIndex + 1);
    fetchMarsWeather(solIndex);
});
