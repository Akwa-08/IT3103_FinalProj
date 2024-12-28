const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { encryptData, decryptData } = require('../../shared/services/encryptionService');
const { getCustomerById } = require('../services/crmService');

// Place an order
const placeOrder = async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    // Fetch customer data
    const token = req.header('Authorization')?.split(' ')[1];
    const customer = await getCustomerById(customerId, token);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Fetch product data
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stockLevel < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create order
    const totalPrice = product.price * quantity;
    const order = await Order.create({
      customerId,
      customerName: customer.name,
      productId,
      productName: product.name,
      quantity,
      totalPrice,
      status: 'Pending',
    });

    // Update stock level
    await product.update({ stockLevel: product.stockLevel - quantity });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await order.update({ status: req.body.status });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { placeOrder, updateOrderStatus, getOrderById };
