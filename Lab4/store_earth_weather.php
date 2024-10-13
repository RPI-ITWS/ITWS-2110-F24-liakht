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

// Clear the Earth weather table
$clear_sql = "DELETE FROM earth_weather";
if ($conn->query($clear_sql) === TRUE) {
    echo "Earth weather table cleared successfully.";
} else {
    echo "Error clearing table: " . $conn->error;
}

$data = json_decode(file_get_contents('php://input'), true);

$overall = $data['overall'];
$description = $data['description'];
$wind_speed = $data['wind_speed'];
$sunrise = $data['sunrise'];
$sunset = $data['sunset'];

// Insert the new Earth weather data into the table
$sql = "INSERT INTO earth_weather (overall, description, wind_speed, sunrise, sunset)
        VALUES ('$overall', '$description', '$wind_speed', '$sunrise', '$sunset')";

if ($conn->query($sql) === TRUE) {
    echo "New Earth weather data stored successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
