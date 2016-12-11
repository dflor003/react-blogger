import {Router} from 'express';
import { UserController } from './users-controller';
import { HealthCheckController } from './health-check-controller';

export interface Controller {
  routes(): Router;
}

const routes: Controller[] = [
  new HealthCheckController(),
  new UserController()
];

export default routes;
