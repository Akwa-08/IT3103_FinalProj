const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/dbConfig'); // Sequelize instance
const { morganMiddleware, logger } = require('../shared/utils/logger');
const customerRoutes = require('./routes/customerRoutes'); // Customer-related routes
const authMiddleware = require('../shared/middlewares/authMiddleware'); // JWT-based auth middleware
const roleMiddleware = require('../shared/middlewares/roleMiddleware'); // RBAC middleware

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(morganMiddleware); // Log HTTP requests

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'CRM service is running' });
});

// Protected Customer routes (apply JWT auth middleware and RBAC)
app.use('/customers', authMiddleware, roleMiddleware(['Admin', 'SalesAgent']), customerRoutes);

// Database synchronization
(async () => {
  try {
    await sequelize.sync({ force: false }); // Sync database (adjust `force` for production)
    logger.info('Database connected and synced successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1); // Exit process if DB connection fails
  }
})();

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`CRM service running on port ${PORT}`);
});
