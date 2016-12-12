import * as uuid from 'uuid';
import {GraphQLString, GraphQLNonNull} from 'graphql';
import {UserType} from './user-type';
import users from '../../db-schema/users';

export const addUser = {
  addUser: {
    type: UserType,
    description: 'Adds a user',
    args: {
      id: {
        type: GraphQLString,
        description: 'The id of the user'
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The user's first name`
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The user's last name`
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The user's email address`
      }
    },
    resolve: (source: any, args: any) => {
      args.id = args.id || uuid();
      return users().create(args)
    }
  }
};
