import {GraphQLObjectType, GraphQLFieldConfigMap} from 'graphql';
import {addUser} from './users/add-user';
import {addPost} from './posts/add-post';
import {addComment} from './comments/add-comment';

const mutations: GraphQLFieldConfigMap<any, any>[] = [
  addUser,
  addPost,
  addComment,
];

export const RootMutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => Object.assign({}, ...mutations)
});
