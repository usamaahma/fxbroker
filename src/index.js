const mongoose = require('mongoose');
const app = require('./app'); // Ensure the correct path
const config = require('./config/config');
const logger = require('./config/logger');

const PORT = process.env.PORT || config.port; // Ensure it binds to Render's PORT
let server;

// Connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');

    // Start the server
    server = app.listen(PORT, '0.0.0.0', () => {  // Ensure it binds to 0.0.0.0
      logger.info(`Listening on port ${PORT}`);
    });

    // Handle SIGTERM for graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        server.close(() => logger.info('Process terminated'));
      }
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
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
