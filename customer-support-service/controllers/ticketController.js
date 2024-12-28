const Ticket = require('../models/ticketModel');
const { getCustomerById } = require('../services/crmService');
const { getOrderById} = require('../services/inventoryService');

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a ticket with order details
const createTicket = async (req, res) => {
  const { customerId, orderId, subject, description, status } = req.body;

  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Fetch customer data
    const customer = await getCustomerById(customerId, token);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Fetch order data if orderId is provided
    let order = null;
    if (orderId) {
      order = await getOrderById(orderId, token);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    // Create ticket
    const ticket = await Ticket.create({
      customerId,
      customerName: customer.name,
      orderId,
      subject,
      description,
      status: status || 'Open',
    });

    res.status(201).json({ ticket, order });
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// Get ticket by ID with order details
const getTicketById = async (req, res) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Fetch order data if orderId exists
    let order = null;
    if (ticket.orderId) {
      order = await getOrderById(ticket.orderId, token);
    }

    res.json({ ticket, order });
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};


// Update ticket details
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const updatedTicket = await ticket.update(req.body);
    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.destroy();
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { getTickets, createTicket, updateTicket, deleteTicket, getTicketById };
