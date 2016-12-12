import * as uuid from 'uuid';
import {GraphQLString, GraphQLNonNull} from 'graphql';
import {UserType} from './user-type';
import users from '../../db-schema/users';

export const addUser = {
  addUser: {
    type: UserType,
    description: 'Adds a user',
    args: {
      externalId: {
        type: GraphQLString,
        description: 'The external id of the user'
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
      },
      pictureSmallUrl: {
        type: GraphQLString,
        description: `The profile picture thumbnail`
      },
      pictureLargeUrl: {
        type: GraphQLString,
        description: `The profile picture full`
      },
    },
    resolve: (source: any, args: any) => {
      args.id = args.id || uuid();
      console.log(`Args`, args);
      return users().create(args)
    }
  }
};
