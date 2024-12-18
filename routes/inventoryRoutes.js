// routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Routes for Inventory Management System
router.post('/items', verifyToken, checkRole(['admin', 'sales agent']), inventoryController.createItem);
router.get('/items', verifyToken, checkRole(['admin', 'sales agent']), inventoryController.getAllItems);
router.get('/items/:id', verifyToken, checkRole(['admin', 'sales agent']), inventoryController.getItemById);
router.put('/items/:id', verifyToken, checkRole(['admin']), inventoryController.updateItem);
router.delete('/items/:id', verifyToken, checkRole(['admin']), inventoryController.deleteItem);

module.exports = router;
