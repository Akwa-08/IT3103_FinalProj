const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME, // e.g., 'supermarket'
  process.env.DB_USER, // e.g., 'root'
  process.env.DB_PASSWORD, // e.g., 'password'
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

module.exports = sequelize;
