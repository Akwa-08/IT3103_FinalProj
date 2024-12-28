const express = require('express');
const { getTickets, createTicket, updateTicket, deleteTicket, getTicketById } = require('../controllers/ticketController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const roleMiddleware = require('../../shared/middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['Admin', 'SupportAgent']), getTickets);
router.post('/', authMiddleware, roleMiddleware(['Admin', 'SupportAgent']), createTicket);
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'SupportAgent']), updateTicket);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteTicket);
router.get('/:id', authMiddleware, roleMiddleware(['Admin', 'SupportAgent']), getTicketById);



module.exports = router;
