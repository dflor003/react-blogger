import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';
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
    posts: {
      type: new GraphQLList(PostType),
      description: `The posts that the user has authored`,
      resolve: resolve(
        () => posts(),
        (source, args) => ({ authorId: source.id})
      )
    }
  })
});
