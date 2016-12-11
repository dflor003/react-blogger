import * as express from 'express';
import {Request, Response, Router} from 'express';
import {handleErrors} from '../utils/handle-error';
import {HttpStatus} from '../utils/http-status';

export class UserController {
  constructor() {

  }

  routes(): Router {
    const router = express.Router();

    return router;
  }
}
