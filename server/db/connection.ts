import * as Sql from 'sequelize';
import { Sequelize } from 'sequelize';
import { AppConfig } from '../config';
import logger from '../utils/logger/logger';

const log = logger('DB');

export class DbConnection {
  private db: Sequelize;

  get isConnected(): boolean {
    return !!this.db;
  }

  init(config: AppConfig): void {
    if (this.db) {
      log.warn(`Db.init() called multiple times.`);
      return;
    }

    const { database, server, port, username, password } = config.db;
    this.db = new Sql(database, username, password, {
      host: server,
      port: port,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      define: {
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
      },
    });

    log.info(`Db connection initialized to ${server}:${port}/${database}`)
  }

  get(): Sequelize {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return this.db;
  }

  close(): void {
    if (!this.db) {
      return;
    }

    log.info(`Db connection cleaning up`);
    this.db.close();
    this.db = null;
  }
}

let instance: DbConnection;
export function connection(): DbConnection {
  return instance || (instance = new DbConnection());
}


