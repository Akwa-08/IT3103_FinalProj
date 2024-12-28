const express = require('express');
const { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerById } = require('../controllers/customerController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const roleMiddleware = require('../../shared/middlewares/roleMiddleware');

const router = express.Router();

// Routes for customers
router.get('/', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), getCustomers);
router.post('/', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), createCustomer);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateCustomer);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteCustomer);
router.get('/:id', authMiddleware, roleMiddleware(['Admin', 'SalesAgent', 'SupportAgent']), getCustomerById);

module.exports = router;
