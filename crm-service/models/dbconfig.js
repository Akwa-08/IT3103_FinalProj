const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // Change to 'postgres' or other dialect if needed
    logging: false, // Disable logging; set to true for debugging
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
