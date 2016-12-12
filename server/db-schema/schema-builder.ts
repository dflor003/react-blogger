import logger from '../utils/logger/logger';
import { connection } from '../db/connection';
import { Sequelize, Model } from 'sequelize';

const log = logger('SCHEMA');
export default function build<TData>(name: string, initializer: (sql: Sequelize) => any): () => Model<TData, TData> {
  let instance: Model<TData, TData>;
  return () => {
    if (instance) {
      return instance;
    }

    try {
      const sql = connection().get();
      instance = initializer(sql);
      log.info(`Initialize schema ${name}`);
      return instance;
    } catch (error) {
      log.error(`Could not build schema item ${name}`, error);
      throw error;
    }
  };
}
