// models/userModel.js

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// User model
const User = {
  // Create user
  create: async (userData) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [rows] = await db.execute(sql, [name, email, hashedPassword, role]);
    return rows;
  },

  // Get user by email
  getByEmail: async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  },

  // Validate password
  validatePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};

module.exports = User;
