import {GraphQLList, GraphQLInt} from 'graphql';
import {UserType} from './user-type';
import {resolve} from '../helpers/resolver';
import users from '../../db-schema/users';

export const allUsers = {
  allUsers: {
    type: new GraphQLList(UserType),
    description: 'Gets a list of users',
    args: {
      limit: {
        type: GraphQLInt,
        description: 'Number of records to return'
      },
      offset: {
        type: GraphQLInt,
        description: 'Offset into set of users'
      }
    },
    resolve: resolve(users)
  }
};
