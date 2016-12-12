import * as express from 'express';
import {Request, Response, Router} from 'express';
import {handleErrors} from '../utils/handle-error';
import {HttpStatus} from '../utils/http-status';
import { sync } from '../db-schema/db-schema';

export class SeedController {

  routes(): Router {
    const router = express.Router();

    router.post('/api/sync', handleErrors((req, res, next) => this.syncDatabase(req, res)))

    return router;
  }

  async syncDatabase(req: Request, res: Response) {
    await sync();
    res.status(HttpStatus.NoContent).send(null);
  }
}
