import * as uuid from 'uuid';
import {GraphQLString, GraphQLNonNull} from 'graphql';
import {PostType} from './post-type';
import posts from '../../db-schema/posts';

export const addPost = {
  addPost: {
    type: PostType,
    description: 'Adds blog post',
    args: {
      authorId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the author of the post'
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The title of the blog post'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The content of the post`
      },
      datetime: {
        type: GraphQLString,
        description: `Optional date to publish at`,
      }
    },
    resolve: (source: any, args: any) => {
      args.id = uuid();
      args.datetime = args.datetime || new Date().toISOString();

      return posts().create(args);
    }
  }
};
