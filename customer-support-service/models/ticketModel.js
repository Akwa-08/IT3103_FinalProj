const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');
const { encryptData, decryptData } = require('../../shared/services/encryptionService');

const Ticket = sequelize.define('Ticket', {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('orderId');
      return rawValue ? decryptData(rawValue) : null;
    },
    set(value) {
      this.setDataValue('orderId', encryptData(value));
    },
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Open',
    validate: {
      isIn: [['Open', 'In Progress', 'Resolved', 'Closed']],
    },
  },
});

module.exports = Ticket;
