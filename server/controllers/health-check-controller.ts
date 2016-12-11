import * as express from 'express';
import {Request, Response, Router} from 'express';
import {handleErrors} from '../utils/handle-error';
import {HttpStatus} from '../utils/http-status';
import { connection } from '../db/connection';

interface HealthCheck {
  name: string;
  up: boolean;
  details: any;
}

export class HealthCheckController {

  routes(): Router {
    const router = express.Router();
    router.get('/health', handleErrors((req, res, next) => this.healthCheck(req, res)));
    return router;
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    // Health check components
    const checks = [
      dbHealthCheck
    ];

    const results = await Promise.all(checks.map(check => check()));

    // Generate a single response with all statuses
    const response = results.reduce((last, result) => {
      return {
        up: last.up && result.up,
        [result.name]: {
          up: result.up,
          details: result.details
        }
      };
    }, { up: true });

    const status = response.up ? HttpStatus.OK : HttpStatus.ServiceUnavailable;
    res.status(status).json(response);
  }
}

async function dbHealthCheck(): Promise<HealthCheck> {
  try {
    return {
      name: 'Database',
      up: true,
      details: {
        version: await connection().get().databaseVersion()
      }
    };
  } catch(error) {
    return {
      name: 'Database',
      up: false,
      details: {
        error: error.message,
        stack: error.stack && error.stack.split('\n')
      }
    }
  }
}
