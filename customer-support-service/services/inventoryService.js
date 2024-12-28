const axios = require('axios');

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3002';

const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(`${INVENTORY_SERVICE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching order data from Inventory: ${error.message}`);
    throw new Error('Unable to fetch order data. Please try again.');
  }
};

module.exports = { getOrderById };
