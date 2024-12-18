// models/inventoryModel.js

const mysql = require('mysql2');
const db = require('../config/db');

// Inventory Model
const Inventory = {
  // Create an item
  createItem: async (itemData) => {
    const { name, description, price, supplierId } = itemData;
    const sql = 'INSERT INTO inventory_items (name, description, price, supplier_id) VALUES (?, ?, ?, ?)';
    const [rows] = await db.execute(sql, [name, description, price, supplierId]);
    return rows;
  },

  // Get all inventory items
  getAllItems: async () => {
    const sql = 'SELECT * FROM inventory_items';
    const [rows] = await db.execute(sql);
    return rows;
  },

  // Get item by ID
  getItemById: async (id) => {
    const sql = 'SELECT * FROM inventory_items WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // Update an inventory item by ID
  updateItem: async (id, itemData) => {
    const { name, description, price, supplierId } = itemData;
    const sql = 'UPDATE inventory_items SET name = ?, description = ?, price = ?, supplier_id = ? WHERE id = ?';
    const [rows] = await db.execute(sql, [name, description, price, supplierId, id]);
    return rows;
  },

  // Delete an inventory item by ID
  deleteItem: async (id) => {
    const sql = 'DELETE FROM inventory_items WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows;
  },

  // Get all stock levels
  getStockLevels: async () => {
    const sql = 'SELECT * FROM stock_levels';
    const [rows] = await db.execute(sql);
    return rows;
  },

  // Get stock level for an item
  getStockLevelByItemId: async (itemId) => {
    const sql = 'SELECT * FROM stock_levels WHERE item_id = ?';
    const [rows] = await db.execute(sql, [itemId]);
    return rows[0];
  },

  // Update stock level
  updateStockLevel: async (itemId, quantity) => {
    const sql = 'UPDATE stock_levels SET quantity = ? WHERE item_id = ?';
    const [rows] = await db.execute(sql, [quantity, itemId]);
    return rows;
  },

  // Create a supplier
  createSupplier: async (supplierData) => {
    const { name, contactInfo } = supplierData;
    const sql = 'INSERT INTO suppliers (name, contact_info) VALUES (?, ?)';
    const [rows] = await db.execute(sql, [name, contactInfo]);
    return rows;
  },

  // Get all suppliers
  getAllSuppliers: async () => {
    const sql = 'SELECT * FROM suppliers';
    const [rows] = await db.execute(sql);
    return rows;
  },

  // Get supplier by ID
  getSupplierById: async (id) => {
    const sql = 'SELECT * FROM suppliers WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },
};

module.exports = Inventory;
