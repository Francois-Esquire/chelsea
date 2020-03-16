import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});