import * as Sql from 'sequelize';
import users from './users';
import posts from './posts';
import comments from './comments';

export async function sync(force: boolean = false): Promise<void> {
  await users().sync({ force: force });
  await posts().sync({ force: force });
  await comments().sync({ force: force });
}
