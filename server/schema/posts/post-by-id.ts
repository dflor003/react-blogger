import {GraphQLString, GraphQLList} from 'graphql';
import {resolve} from '../helpers/resolver';
import {PostType} from './post-type';
import posts from '../../db-schema/posts';

export const postById = {
  postById: {
    type: new GraphQLList(PostType),
    description: 'Gets a post by its id',
    args: {
      id: {
        type: GraphQLString,
        description: 'The number of records to return'
      }
    },
    resolve: resolve(posts)
  }
};
