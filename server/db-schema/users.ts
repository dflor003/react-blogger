import * as Sql from 'sequelize';
import build from './schema-builder';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default build<UserData>('users', db => {
  return db.define<UserData, UserData>(
    'users',
    {
      id: {
        primaryKey: true,
        type: Sql.UUID,
        allowNull: false,
        field: 'id'
      },
      externalId: {
        type: Sql.STRING(255),
        allowNull: true,
        field: 'externalId'
      },
      firstName: {
        type: Sql.STRING(100),
        allowNull: false,
        field: 'firstName'
      },
      lastName: {
        type: Sql.STRING(100),
        allowNull: false,
        field: 'lastName'
      },
      email: {
        type: Sql.STRING(100),
        allowNull: false,
        field: 'email'
      },
      pictureSmallUrl: {
        type: Sql.STRING(1024),
        allowNull: true,
        field: 'pictureSmallUrl'
      },
      pictureLargeUrl: {
        type: Sql.STRING(1024),
        allowNull: true,
        field: 'pictureLargeUrl'
      },
    },
    {
      freezeTableName: true
    }
  );
});
