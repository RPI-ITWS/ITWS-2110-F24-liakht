<?php
$servername = "localhost";  
$username = "phpmyadmin";  
$password = "Programa!2#4";  
$dbname = "weather";  

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Clear the Mars weather table
$clear_sql = "DELETE FROM mars_weather";
if ($conn->query($clear_sql) === TRUE) {
    echo "Mars weather table cleared successfully.";
} else {
    echo "Error clearing table: " . $conn->error;
}

$data = json_decode(file_get_contents('php://input'), true);

// Use the correct keys for the northern and southern season
$season = $data['season'];
$northSeason = $data['Northern_season'];
$southSeason = $data['Southern_season'];
$averageTemp = $data['averageTemp'];
$atmosphericPressure = $data['atmosphericPressure'];
$marsWindSpeed = $data['marsWindSpeed'];

// Insert the new Mars weather data into the table
$sql = "INSERT INTO mars_weather (season, northSeason, southSeason, averageTemp, atmosphericPressure, marsWindSpeed)
        VALUES ('$season', '$northSeason', '$southSeason', '$averageTemp', '$atmosphericPressure', '$marsWindSpeed')";

if ($conn->query($sql) === TRUE) {
    echo "New Mars weather data stored successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
