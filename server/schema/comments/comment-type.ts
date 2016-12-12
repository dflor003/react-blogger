import {GraphQLObjectType, GraphQLString} from 'graphql';
import {UserType} from '../users/user-type';
import {resolve} from '../helpers/resolver';
import {PostType} from '../posts/post-type';
import users from '../../db-schema/users';
import posts from '../../db-schema/posts';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a blog post',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: `The comment's id`
    },
    content: {
      type: GraphQLString,
      description: `The content of the blog post`
    },
    datetime: {
      type: GraphQLString,
      description: `The date and time that the post was created`,
      resolve: (source: any) => source.datetime.toISOString()
    },
    user: {
      type: UserType,
      description: `The user that made the comment`,
      resolve: resolve(
        () => users(),
        (source, args) => ({ id: source.userId })
      )
    },
    post: {
      type: PostType,
      description: `The post that this comment was made on`,
      resolve: resolve(
        () => posts(),
        (source, args) => ({ id: source.postId })
      )
    }
  })
});
