import * as sequelize from 'sequelize';
import {Model} from 'sequelize';
import {GraphQLFieldResolver} from 'graphql';
import {resolver} from 'graphql-sequelize';

export function resolve(schemaFunc: () => Model<any, any>, transform?: (source: any, args: any) => any): GraphQLFieldResolver<any, any> {
  transform = transform || ((source, args) => args);
  return (source, args, context, info) => {
    const schema = schemaFunc();
    const actualResolver = resolver(schema);
    const transformedArgs = transform(source, args);
    console.log(transformedArgs);
    return actualResolver(source, transformedArgs, context, info);
  };
}
