import {GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {resolve} from '../helpers/resolver';
import {PostType} from './post-type';
import posts from '../../db-schema/posts';

const {assign} = Object;
export const allPosts = {
  allPosts: {
    type: new GraphQLList(PostType),
    description: 'Gets all posts',
    args: {
      limit: {
        type: GraphQLInt,
        description: 'The number of records to return'
      },
      offset: {
        type: GraphQLInt,
        description: 'The offset from the start of the set of posts'
      },
      order: {
        type: GraphQLString,
        description: 'Field to order by'
      }
    },
    resolve: resolve(
      () => posts(),
      (source, args) => assign({}, { order: "reverse:datetime" }, args))
  }
};
