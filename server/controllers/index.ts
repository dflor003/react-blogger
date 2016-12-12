import {Router} from 'express';
import { HealthCheckController } from './health-check-controller';
import { SeedController } from './seed-controller';

export interface Controller {
  routes(): Router;
}

const routes: Controller[] = [
  new SeedController(),
  new HealthCheckController(),
];

export default routes;
