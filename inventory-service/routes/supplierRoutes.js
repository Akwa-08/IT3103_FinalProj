const express = require('express');
const { getSuppliers, createSupplier, updateSupplier, deleteSupplier, getSupplierById } = require('../controllers/supplierController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const roleMiddleware = require('../../shared/middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), getSuppliers);
router.post('/', authMiddleware, roleMiddleware(['Admin']), createSupplier);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateSupplier);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteSupplier);
router.get('/:id', authMiddleware, roleMiddleware(['Admin']), getSupplierById);

module.exports = router;
