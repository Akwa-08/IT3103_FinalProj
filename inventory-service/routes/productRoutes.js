const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const roleMiddleware = require('../../shared/middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), getProducts);
router.post('/', authMiddleware, roleMiddleware(['Admin']), createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteProduct);
router.get('/:id', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), getProductById);

module.exports = router;
