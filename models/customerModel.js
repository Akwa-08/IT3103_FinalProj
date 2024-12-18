// models/customerModel.js
const db = require('../config/db');
const mysql = require('mysql2');

// Customer model
const Customer = {
  // Create customer
  create: async (customerData) => {
    const { name, email, phone, address } = customerData;
    const sql = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
    const [rows] = await db.execute(sql, [name, email, phone, address]);
    return rows;
  },

  // Get all customers
  getAll: async () => {
    const sql = 'SELECT * FROM customers';
    const [rows] = await db.execute(sql);
    return rows;
  },

  // Get customer by ID
  getById: async (id) => {
    const sql = 'SELECT * FROM customers WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // Update customer by ID
  updateById: async (id, customerData) => {
    const { name, email, phone, address } = customerData;
    const sql = 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
    const [rows] = await db.execute(sql, [name, email, phone, address, id]);
    return rows;
  },

  // Delete customer by ID
  deleteById: async (id) => {
    const sql = 'DELETE FROM customers WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  },
};

module.exports = Customer;
