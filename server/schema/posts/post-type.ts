import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {UserType} from '../users/user-type';
import {resolve} from '../helpers/resolver';
import {CommentType} from '../comments/comment-type';
import users from '../../db-schema/users';
import comments from '../../db-schema/comments';

export const PostType: any = new GraphQLObjectType({
  name: 'Post',
  description: 'A blog post',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: `The id of the blog post`
    },
    title: {
      type: GraphQLString,
      description: `The title of the blog post`
    },
    content: {
      type: GraphQLString,
      description: `The content of the blog post`
    },
    datetime: {
      type: GraphQLString,
      description: `The date and time that the post was created`
    },
    author: {
      type: UserType,
      description: `The author of the post`,
      resolve: resolve(
        () => users(),
        (source, args) => ({ id: source.authorId })
      )
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        limit: {
          type: GraphQLInt,
          description: `The number of records to retrieve`
        },
        offset: {
          type: GraphQLInt,
          description: `The offset from the start of the set of comments`
        }
      },
      description: `The comments made on a post`,
      resolve: resolve(
        () => comments(),
        (source, args) => ({ postId: source.id })
      )
    }
  })
});
