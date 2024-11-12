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
} else {
    echo "Connected successfully!";
}

// Data
$season = $_POST['season'];
$northSeason = $_POST['northSeason'];
$southSeason = $_POST['northSeason'];
$averageTemp = $_POST['averageTemp'];
$atmosphericPressure = $_POST['atmosphericPressure'];
$marsWindSpeed = $_POST['marsWindSpeed'];

// Delete existing data
$sql_delete = "DELETE FROM mars_weather";
if ($conn->query($sql_delete) === TRUE) {
    echo "Old data deleted successfully.";
} else {
    echo "Error deleting old data: " . $conn->error;
}

// Prepare SQL query
$sql = "INSERT INTO mars_weather (season, northSeason, southSeason, averageTemp, atmosphericPressure, marsWindSpeed) 
VALUES ('$season', '$northSeason', '$southSeason', '$averageTemp', '$atmosphericPressure', '$marsWindSpeed')";

// Execute query
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
