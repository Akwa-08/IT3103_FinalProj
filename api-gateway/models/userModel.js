const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');

// Define User model using Sequelize
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Admin', 'SalesAgent', 'SupportAgent']],
    },
  },
});

module.exports = User;
