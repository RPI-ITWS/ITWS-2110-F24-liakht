<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect
$servername = "localhost";  
$username = "phpmyadmin";  
$password = "Programa!2#4";  
$dbname = "quiz1";  

$conn = new mysqli($servername, $username, $password, $dbname);

// Validate
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// Convert JSON into 2 lists of keys, Currency : List
$currencyList = array_keys($rates);
$rateList = array_values($rates);

// Data passed in
$amount = $_POST['amount'];
$base = $_POST['base'];
$date = $_POST['date'];
$rates = json_decode($_POST['rates'], true); 

// Iterate through every rate
for ($i = 0; $i < count($currencyList); $i++) {
   $currency = $currencyList[$i];
   $rate = $rateList[$i];

   $stmt = $conn->prepare("INSERT INTO exchange_rates (amount, base, date, currency, rate) VALUES (?, ?, ?, ?, ?)");
   $stmt->bind_param("dssss", $amount, $base, $date, $currency, $rate);

   // Error
   if (!$stmt->execute()) {
      echo "Error: " . $stmt->error;
   }
}

// Close the connection
$stmt->close();
$conn->close();
?>
