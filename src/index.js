const mongoose = require('mongoose');
const app = require('./app'); // Correct path
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// Connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  // Use the PORT from environment or fallback to config port
  const PORT = process.env.PORT || config.port;

  // Start the server
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});

// Exit Handler
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Unexpected Error Handler
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});