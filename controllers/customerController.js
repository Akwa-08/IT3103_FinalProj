// controllers/customerController.js

const Customer = require('../models/customerModel');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ message: 'Customer created successfully', data: customer });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.status(200).json({ message: 'Customers retrieved successfully', data: customers });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customers', error: error.message });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer retrieved successfully', data: customer });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer', error: error.message });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const updatedCustomer = await Customer.updateById(req.params.id, req.body);
    if (updatedCustomer.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

// Delete a customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const deletedCustomer = await Customer.deleteById(req.params.id);
    if (deletedCustomer.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
