import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {PostType} from '../posts/post-type';
import {resolve} from '../helpers/resolver';
import posts from '../../db-schema/posts';

export const UserType: any = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: `The user's id`
    },
    externalId: {
      type: GraphQLString,
      description: `An external identifier for the user from the auth system`
    },
    firstName: {
      type: GraphQLString,
      description: `The user's first name`
    },
    lastName: {
      type: GraphQLString,
      description: `The user's last name`
    },
    email: {
      type: GraphQLString,
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
    posts: {
      type: new GraphQLList(PostType),
      description: `The posts that the user has authored`,
      args: {
        limit: {
          type: GraphQLInt,
          description: `The maximum number of records to return`
        },
        offset: {
          type: GraphQLInt,
          description: `The offset from the start of the posts`
        }
      },
      resolve: resolve(
        () => posts(),
        (source, args) => ({ authorId: source.id, order: 'reverse:datetime' })
      )
    }
  })
});
