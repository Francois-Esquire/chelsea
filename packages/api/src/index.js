import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});