import * as Sql from 'sequelize';
import build from './schema-builder';
import users from './users';

export interface PostData {
  id: string;
  authorId: string;
  content: string;
  datetime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default build<PostData>('posts', db => {
  return db.define<PostData, PostData>(
    'posts',
    {
      id: {
        primaryKey: true,
        type: Sql.UUID,
        allowNull: false,
        field: 'id'
      },
      authorId: {
        type: Sql.UUID,
        allowNull: false,
        references: {
          model: users(),
          key: 'id'
        }
      },
      title: {
        type: Sql.STRING(500),
        allowNull: false,
        field: 'title'
      },
      content: {
        type: Sql.TEXT,
        allowNull: false,
        field: 'content'
      },
      datetime: {
        type: Sql.DATE,
        allowNull: false,
        field: 'datetime'
      },
    },
    {
      freezeTableName: true
    }
  );
});
