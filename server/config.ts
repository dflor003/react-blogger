import { asBool, asInt, asString } from './utils/env-vars';

export interface AppConfig {
  debug: boolean;
  port: number;
  db: {
    database: string;
    username: string;
    password: string;
    server: string;
    port: number;
  };
}

export default <AppConfig>{
  debug: asBool('DEBUG', true),
  port: asInt('PORT', 3001),
  db: {
    database: asString('DB_DATABASE', null),
    username: asString('DB_USER', null),
    password: asString('DB_PASS', null),
    server: asString('DB_SERVER', null),
    port: asInt('DB_PORT', null),
  }
};
