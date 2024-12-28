const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');
const { encryptData, decryptData } = require('../../shared/services/encryptionService');

const Order = sequelize.define('Order', {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('customerName');
      return rawValue ? decryptData(rawValue) : null;
    },
    set(value) {
      this.setDataValue('customerName', encryptData(value));
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('productName');
      return rawValue ? decryptData(rawValue) : null;
    },
    set(value) {
      this.setDataValue('productName', encryptData(value));
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
    validate: {
      isIn: [['Pending', 'Completed', 'Cancelled']],
    },
  },
});

module.exports = Order;
