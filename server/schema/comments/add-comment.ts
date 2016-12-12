import * as uuid from 'uuid';
import {GraphQLString, GraphQLNonNull} from 'graphql';
import {CommentType} from './comment-type';
import comments from '../../db-schema/comments';

export const addComment = {
  addComment: {
    type: CommentType,
    description: 'Adds comment on a post',
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user that made the comment'
      },
      postId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the post to comment on'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The user's first name`
      }
    },
    resolve: (source: any, args: any) => {
      args.id = uuid();
      args.datetime = new Date().toISOString();

      return comments().create(args);
    }
  }
};
