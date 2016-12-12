import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList} from 'graphql';
import {CommentType} from './comment-type';
import comments from '../../db-schema/comments';
import {resolve} from '../helpers/resolver';

export const commentsForPost = {
  commentsForPost: {
    type: new GraphQLList(CommentType),
    description: 'Gets the comments for a given post',
    args: {
      postId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the post to retrieve comments for'
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of records to return'
      },
      offset: {
        type: GraphQLInt,
        description: `The offset into the set of comments`
      }
    },
    resolve: resolve(
      comments,
      (source, args) => ({ ...args, order: 'reverse:datetime' })
    )
  }
};
