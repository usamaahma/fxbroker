const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// --- Function Declarations (hoisted) ---

// Server startup function
function startServer() {
  const PORT = process.env.PORT || config.port;

  server = app
    .listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`⚡ Environment: ${config.env}`);
      logger.info(`📡 Access URL: http://localhost:${PORT}`);
    })
    .on('error', (err) => {
      logger.error('💥 Server startup error:', err);
      process.exit(1);
    });

  // Health check endpoint (for Render monitoring)
  app.get('/ping', (req, res) => {
    res.status(200).json({
      status: 'OK',
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  });
}

// Enhanced MongoDB connection with retry logic
function connectWithRetry() {
  mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      logger.info('✅ Connected to MongoDB successfully');
      startServer();
    })
    .catch((err) => {
      logger.error('❌ MongoDB initial connection failed, retrying in 5 seconds...', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
}

// Error handlers
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

// --- Execution Starts Here ---
connectWithRetry();

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('🛑 SIGTERM received - Shutting down gracefully');
  if (server) {
    server.close(() => {
      mongoose.connection.close(false, () => {
        logger.info('💤 MongoDB connection closed');
        process.exit(0);
      });
    });
  }
});
