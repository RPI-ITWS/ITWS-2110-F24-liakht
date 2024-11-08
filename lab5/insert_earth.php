<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
$overall = $_POST['overall'];
$description = $_POST['description'];
$windSpeed = floatval($_POST['windSpeed']);
$sunrise = intval($_POST['sunrise']);
$sunset = intval($_POST['sunset']);

// Delete existing data
$sql_delete = "DELETE FROM earth_weather";
if ($conn->query($sql_delete) === TRUE) {
    echo "Old data deleted successfully.";
} else {
    echo "Error deleting old data: " . $conn->error;
}

// Prepare Insert Query
$sql = "INSERT INTO earth_weather (`overall`, `description`, `wind_speed`, `sunrise`, `sunset`) 
VALUES ('$overall', '$description', '$windSpeed', '$sunrise', '$sunset')";

// Execute query
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
