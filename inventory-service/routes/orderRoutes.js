const express = require('express');
const { placeOrder, updateOrderStatus, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const roleMiddleware = require('../../shared/middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), placeOrder);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateOrderStatus);
router.get('/:id', authMiddleware, roleMiddleware(['Admin', 'SalesAgent', 'SupportAgent']), getOrderById);

module.exports = router;
