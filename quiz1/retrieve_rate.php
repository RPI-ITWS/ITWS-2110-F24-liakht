<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";  
$username = "phpmyadmin";  
$password = "Programa!2#4";  
$dbname = "weather";  

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT amount, base, date, currency, rate FROM exchange_rates";
$result = $conn->query($sql);

// Results
$data = array();

if ($result->num_rows > 0) {
   // Fetch each row and add it to the data array
   while($row = $result->fetch_assoc()) {
      $data[] = $row;
   }
} 

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);

// Close connection
$conn->close();
?>
