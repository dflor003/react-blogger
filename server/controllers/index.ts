import {Router} from 'express';
import { UserController } from './users-controller';
import { HealthCheckController } from './health-check-controller';
import { SeedController } from './seed-controller';

export interface Controller {
  routes(): Router;
}

const routes: Controller[] = [
  new SeedController(),
  new HealthCheckController(),
  new UserController()
];

export default routes;
