// controllers/inventoryController.js

const Inventory = require('../models/inventoryModel');

// Create a new inventory item
const createItem = async (req, res) => {
  try {
    const { name, description, price, supplierId } = req.body;
    const item = await Inventory.createItem({ name, description, price, supplierId });
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// Get all inventory items
const getAllItems = async (req, res) => {
  try {
    const items = await Inventory.getAllItems();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get an inventory item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Inventory.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Update an inventory item
const updateItem = async (req, res) => {
  try {
    const itemData = req.body;
    const item = await Inventory.updateItem(req.params.id, itemData);
    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete an inventory item
const deleteItem = async (req, res) => {
  try {
    const item = await Inventory.deleteItem(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
