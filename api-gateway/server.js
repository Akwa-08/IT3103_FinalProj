const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, morganMiddleware } = require('../shared/utils/logger');
const sequelize = require('./models/dbConfig'); // Sequelize config

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morganMiddleware);

// Routes
app.use('/auth', authRoutes);

// Error handler (must be after routes)
app.use(errorHandler);

// Sync database
sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
}).catch(err => {
  console.error('Database sync failed:', err);
});

// Start server
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
