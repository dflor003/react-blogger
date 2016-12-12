import users from './users';
import posts from './posts';
import comments from './comments';

export function allSchema() {
  return [
    users(),
    posts(),
    comments()
  ];
}

export function ensureSchema() {
  users().hasMany(posts());
  posts().hasMany(comments());
}

export async function sync(force = false): Promise<void> {
  for (let schema of allSchema()) {
    await schema.sync({ force });
  }
}
