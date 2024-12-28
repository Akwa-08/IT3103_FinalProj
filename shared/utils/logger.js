// /shared/utils/logger.js
const winston = require('winston');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log'),
      level: 'info',
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'errors.log'),
      level: 'error',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Configure Morgan for HTTP request logging
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
};

module.exports = { logger, morganMiddleware, errorHandler };
