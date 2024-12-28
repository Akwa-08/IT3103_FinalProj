const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');
const { encryptData, decryptData } = require('../../shared/services/encryptionService');

const Supplier = sequelize.define('Supplier', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
    get() {
      const rawValue = this.getDataValue('contactEmail');
      return rawValue ? decryptData(rawValue) : null;
    },
    set(value) {
      this.setDataValue('contactEmail', encryptData(value));
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('address');
      return rawValue ? decryptData(rawValue) : null;
    },
    set(value) {
      this.setDataValue('address', encryptData(value));
    },
  },
});

module.exports = Supplier;
