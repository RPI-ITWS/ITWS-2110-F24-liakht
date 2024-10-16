For this lab I found it surprising how well GPT 4o was able to understand everything that I asked and deliver what I was looking for. I started by first writing up a long first message detailing exactly what I wanted and provided it with information on how to access my already setup database based and the API keys to the APIs I wanted it to use. To my surprise, it was able to get everything to work from the first message with the exception of missing one piece of mars weather data which I was able to easily prompt it to fix. Next, I worked with it to create the php files for storing / retrieving from the database as well as organizing the code in seperate html / css / js files. Finally, I prompted it to generate me images that I can use for mars and earth as well as improving the css. I found that css is a massive strength of gpt as it was quickly able to make something look good. Before submitting, I edited the php files to include the proper logins (while testing locally I told GPT to use root and no password)

I did not use many resources other than https://chatgpt.com 4o model. I fed into it my API links: https://openweathermap.org/current and https://api.nasa.gov/ but I never actually opened them myself. I referenced back to my lab3 to see how I created the SQL tables so GPT understood what the database accepted. 

Scope:
For the scope of this I tried to make it as similar as possible to my lab3. The only feature that I left out was the geolocation and the text that displayed it. I hard coded the longitude and latitude to be at Troy. 

ZAP Report:
Ran Zap on my complete lab and got back no red flags. File is named ZAPReport.png and can be found at 
https://liakht.eastus.cloudapp.azure.com/ITWS-2110-F24-liakht/lab4/ZAPReport.png

-------------------------------------------------------------------------------------------------------------------------------------------------
Chat Logs:

I am creating a website using plain HTML / CSS / JavaScript / PHP which displays information from two APIs and allows the user to see the information from them. The app is called 'Interplanetary Weather Tracker' and displays information information about the APIs side by side in boxes. The first API shows the current weather at this longitude and latitude: latitude = 42.7284  longitude = 73.6918 using https://openweathermap.org/current. The API key is 794fd5d12fde6943bd7508fb8437bbb8. It should fetch and display this data: overall, description, wind speed, when sunrise is and when sunset is in a user friendly way of reading

The second API is https://api.nasa.gov/ using the Oph0yfAh15X1VIVI84QwQUSHZBJxcgludiDU9Ufd API key. This API should use the /insight_weather endpoint to fetch the weather on mars, allowing the user to see weather in the past by giving them arrows. It should display this information: Season, north season, south season, average temp, atmospheric pressure, mars wind speed. 

Other than that, feel free to make it as creative or visually appealing as you come up with

Finally, I want you to use a SQL database to store the information and retrieve it. When the page is loaded / the user selects different data I want you to use Javascript to fetch that data. Then call a php script to store the relevant data in my SQL database. Next, use another php scrip to fetch the data out of the SQL database, and finally update the HTML code using JS. 

The SQL is already setup and here is the layout of it. There is a weather database with two tables: earth_weather and mars_weather. These two tables were generated with the following code:

CREATE TABLE earth_weather (
   id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   overall VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   wind_speed FLOAT NOT NULL,
   sunrise INT NOT NULL,
   sunset INT NOT NULL,
   reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mars_weather (
   id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   season VARCHAR(255) NOT NULL,
   northSeason VARCHAR(255) NOT NULL,
   southSeason VARCHAR(255) NOT NULL,
   averageTemp FLOAT NOT NULL,
   atmosphericPressure FLOAT NOT NULL,
   marsWindSpeed FLOAT NOT NULL,
   reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


To connect to the database in php, you can use this script. I am using XAMPP to test locally.

$servername = "localhost";
$username = "root";  
$password = "";      
$port = 3307;       
$dbname = "weather";    

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

------------------------------------------------------------

separate the HTML / css / javascript into seperate files 

------------------------------------------------------------

store_mars_weather.php got cut off, can you retype it. In addition, I don't want the elements of the HTML to be updated right away. I want you to store it in the SQL, retrieve it from the SQL and then use what you retrieved to update the HTML

------------------------------------------------------------

Every time you add data to mars, I want you to clear the table first. In addition, currently north season and south season are empty. After looking at the API using the chrome networks I see that it is returned via northern_season and southern_season but capitalized so Southern_season and Northern_season 

------------------------------------------------------------

Do the same with earth_weather. Every time the user fetches it should clear the table first

------------------------------------------------------------

Add a feature that displays what season is currently being displayed in mars as well as an image or earth and an image or mars under the respective box. Add styling to the css to make it look visually appealing and creative

------------------------------------------------------------

Remove the current mars season and move the images to be right under Mars Weather and Earth Weather

------------------------------------------------------------

Generate me an image that I can use for the earth block

------------------------------------------------------------

Generate me a similar image for mars

------------------------------------------------------------

Can you spice up my css to make this page look space themed 

