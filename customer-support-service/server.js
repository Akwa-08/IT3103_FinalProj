const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/dbConfig');
const ticketRoutes = require('./routes/ticketRoutes');
const { morganMiddleware, logger } = require('../shared/utils/logger');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morganMiddleware);


app.use('/tickets', ticketRoutes);

(async () => {
  try {
    await sequelize.sync({ force: false });
    logger.info('Database connected and synced successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Customer Support service running on port ${PORT}`);
});
