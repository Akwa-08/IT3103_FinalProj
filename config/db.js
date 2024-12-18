// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection to the MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',        // Hostname of your MySQL server
  user: process.env.DB_USER || 'root',             // Username for MySQL
  password: process.env.DB_PASSWORD || '',         // Password for MySQL
  database: process.env.DB_NAME || 'supermarket_db', // Your database name
  waitForConnections: true,
  connectionLimit: 10,                           // Limit the number of connections
  queueLimit: 0
});

module.exports = db.promise(); // Using promise-based API for async/await support
