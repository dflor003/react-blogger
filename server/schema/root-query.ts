import {GraphQLObjectType, GraphQLFieldConfigMap} from 'graphql';
import {allUsers} from './users/all-users';
import {userById} from './users/user-by-id';
import {allPosts} from './posts/all-posts';
import {postById} from './posts/post-by-id';
import {userExists} from './users/user-exists';
import {userByExternalId} from './users/user-by-external-id';

const queries: GraphQLFieldConfigMap<any, any>[] = [
  allUsers,
  allPosts,
  userById,
  postById,
  userExists,
  userByExternalId
];

export const RootQuery = new GraphQLObjectType({
  name: 'Queries',
  fields: () => Object.assign({}, ...queries)
});
