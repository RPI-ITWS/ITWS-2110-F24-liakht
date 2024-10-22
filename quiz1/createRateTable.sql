CREATE TABLE exchange_rates (
   id INT AUTO_INCREMENT PRIMARY KEY,
   amount DECIMAL(10, 2),
   base VARCHAR(3),
   date DATE,
   currency VARCHAR(3),
   rate DECIMAL(10, 4)
);
