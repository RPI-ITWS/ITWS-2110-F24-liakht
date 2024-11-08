<?php
$servername = "localhost";  
$username = "phpmyadmin";  
$password = "Programa!2#4";  
$dbname = "weather";  

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// Query to get the weather data from the earth_weather table
$sql = "SELECT overall, description, wind_speed, sunrise, sunset FROM earth_weather LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
   $row = $result->fetch_assoc();
   echo json_encode($row); 
} else {
   echo json_encode(array('error' => 'No weather data found.'));
}

// Close connection
$conn->close();
?>
