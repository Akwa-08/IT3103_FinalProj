// app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const { verifyToken, checkRole } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes for Authentication
app.use('/api/auth', authRoutes);

// Routes for CRM System (Customer CRUD)
app.use('/api/customers', verifyToken, checkRole(['admin', 'sales agent']), customerRoutes);
app.use('/api/inventory', verifyToken, checkRole(['admin', 'sales agent']), inventoryRoutes);

app.get('/', (req, res) => {
    res.send('Supermarket System API');
  });
  
module.exports = app;