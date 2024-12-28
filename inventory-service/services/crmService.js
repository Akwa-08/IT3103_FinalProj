const axios = require('axios');

// CRM service base URL
const CRM_SERVICE_URL = process.env.CRM_SERVICE_URL || 'http://localhost:3001';

// Fetch customer data by ID
const getCustomerById = async (customerId, token) => {
  try {
    const response = await axios.get(`${CRM_SERVICE_URL}/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching customer data from CRM:', error.message);
    throw new Error('Unable to fetch customer data. Please try again.');
  }
};


module.exports = { getCustomerById };
