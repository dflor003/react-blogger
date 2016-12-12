import {GraphQLString, GraphQLNonNull} from 'graphql';
import users from '../../db-schema/users';
import {UserType} from './user-type';
import {resolve} from '../helpers/resolver';

export const userById = {
  userById: {
    type: UserType,
    description: 'Gets the user by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user'
      }
    },
    resolve: resolve(users)
  }
};
