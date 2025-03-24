const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// Enhanced MongoDB connection with better error handling
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('✅ Connected to MongoDB successfully');

    // Get the port from environment or config (Render provides process.env.PORT)
    const PORT = process.env.PORT || config.port;

    // Must bind to 0.0.0.0 for Render
    server = app
      .listen(PORT, '0.0.0.0', () => {
        logger.info(`🚀 Server running on port ${PORT}`);
        logger.info(`⚡ Environment: ${config.env}`);
      })
      .on('error', (err) => {
        logger.error('💥 Server startup error:', err);
        process.exit(1);
      });

    // Add ping route for Render health checks
    app.get('/ping', (req, res) => res.status(200).send('pong'));
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Enhanced error handlers
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('🛑 Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error('⚠️ Unexpected error:', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('🛑 SIGTERM received - Shutting down gracefully');
  if (server) {
    server.close(() => {
      logger.info('💤 Process terminated');
      process.exit(0);
    });
  }
});
