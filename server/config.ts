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
    database: asString('DB_DATABASE', 'blogger'),
    username: asString('DB_USER', 'postgres'),
    password: asString('DB_PASS', 'P@$$w0rd'),
    server: asString('DB_SERVER', 'localhost'),
    port: asInt('DB_PORT', 5432),
  }
};
