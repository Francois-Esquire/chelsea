import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV === 'development';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context,
  cors: dev,
  introspection: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
    tabs: [
      {
        query: `query\t{\n\tme\t{\n\t\tid\n\t}\n}`,
      },
    ],
  },
  onHealthCheck() {
    // TODO: wait for db
    return Promise.resolve();
  },
});

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});