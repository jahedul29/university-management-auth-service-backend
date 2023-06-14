import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

let server: Server;

const closeServer = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected');

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', async function (error) {
    errorLogger.error(error);
    closeServer();
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM process detected');
  closeServer();
});
