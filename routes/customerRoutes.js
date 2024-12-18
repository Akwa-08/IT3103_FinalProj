// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
// Routes for CRM System
router.post('/', verifyToken, checkRole(['admin']),customerController.createCustomer);
router.get('/',verifyToken, checkRole(['admin', 'sales agent']), customerController.getAllCustomers);
router.get('/:id',verifyToken, checkRole(['admin', 'sales agent']), customerController.getCustomerById);
router.put('/:id',verifyToken, checkRole(['admin']), customerController.updateCustomerById);
router.delete('/:id', verifyToken, checkRole(['admin']),customerController.deleteCustomerById);

module.exports = router;
