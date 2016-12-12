import * as Sql from 'sequelize';
import build from './schema-builder';
import posts from './posts';
import users from './users';

export interface CommentData {
  id: string;
  postId: string;
  userId: string;
  content: string;
  datetime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default build<CommentData>('comments', db => {
  return db.define<CommentData, CommentData>(
    'posts',
    {
      id: {
        primaryKey: true,
        type: Sql.UUID,
        allowNull: false,
        field: 'id'
      },
      postId: {
        type: Sql.UUID,
        allowNull: false,
        references: {
          model: posts(),
          key: 'id'
        }
      },
      userId: {
        type: Sql.UUID,
        allowNull: false,
        references: {
          model: users(),
          key: 'id'
        }
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
