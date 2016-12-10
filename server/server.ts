import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import uuid from 'uuid';
import {Request, Response} from 'express';
import {NotFoundError, HttpError} from './utils/errors';
import logger from './utils/logger';
import config from './config';
import { HttpStatus } from './utils/http-status';

const log = logger('STARTUP');

function run(root: string = __dirname): void {
  // Setup
  const app = express();
  const debug = config.debug;
  const port = config.port;

  // CORS for client-side
  app.use(cors());
  app.options('*', cors());

  // Request logging
  app.use(morgan('dev'));

  // Json payload parsing
  app.disable('etag'); // Disables etags for JSON requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routes
  app.get('/health', (req, res, next) => {
    res.status(HttpStatus.OK).json({
      up: true
    });
  });

  // Catch-all 404 route
  app.use((req: Request, res: Response, next: Function) => {
    const message = `Could not find resource: ${req.url}`;
    next(new NotFoundError(message));
  });

  // Error handler
  const routeLogger = logger('ROUTE-ERR');
  app.use((err: HttpError, req: Request, res: Response, next: Function) => {
    const errorId = uuid(),
      status = err.status || 500,
      stack = err.stack;

    // Send error response
    res.status(status).json({
      id: errorId,
      message: err.message || `An error occurred`,
      stack: debug === true
        ? err.stack.split('\n')
        : undefined
    });

    // Log it
    routeLogger.error(`Error in: ${req.method.toUpperCase()} ${req.url}`);
    routeLogger.error(`Error ID: ${errorId} - ${err.message}`);
    routeLogger.error(`Stack   : ${err.stack}`);
  });

  // Start the server
  const server = app.listen(port);
  server
    .on('listening', () => {
      const address = server.address(),
        bind = typeof address === 'string'
          ? `pipe ${address}`
          : `port ${address.port}`;
      log.info(`Listening on ${bind}`);
    })
    .on('error', (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          log.error(`${port} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          log.error(`${port} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    })
    .on('SIGINT', () => server.close())
    .on('close', () => {
      process.exit(0);
    });
}

run(path.join(__dirname, '../'));
