const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/dbConfig');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { morganMiddleware, logger } = require('../shared/utils/logger');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morganMiddleware);

app.get('/health', (req, res) => res.json({ status: 'Inventory service is running' }));

app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orders', orderRoutes);

(async () => {
  try {
    await sequelize.sync({ force: false });
    logger.info('Database connected and synced successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  logger.info(`Inventory service running on port ${PORT}`);
});
