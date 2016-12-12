import * as Sql from 'sequelize';
import userSchema from './user';

export async function sync(force: boolean = false): Promise<void> {
  await userSchema().sync({ force: force });
}
