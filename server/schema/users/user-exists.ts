import {GraphQLString, GraphQLNonNull, GraphQLBoolean} from 'graphql';
import users from '../../db-schema/users';
import {UserType} from './user-type';
import {resolve} from '../helpers/resolver';


export const userExists = {
  userExists: {
    type: GraphQLBoolean,
    description: 'Checks whether the user exists or not',
    args: {
      externalId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user'
      }
    },
    resolve: (source: any, args: any) => users().count({
      where: {
        externalId: args.externalId
      }
    })
  }
};
