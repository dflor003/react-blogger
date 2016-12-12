import {GraphQLString, GraphQLNonNull} from 'graphql';
import users from '../../db-schema/users';
import {UserType} from './user-type';
import {resolve} from '../helpers/resolver';

export const userByExternalId = {
  userByExternalId: {
    type: UserType,
    description: 'Gets the user by their external id',
    args: {
      externalId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The external id of the user'
      }
    },
    resolve: resolve(users)
  }
};
