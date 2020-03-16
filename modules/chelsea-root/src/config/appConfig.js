import csp from './csp';
import { graphqlEndpoint } from './endpoints';

const corsOrigins = process.env.NODE_ENV === 'production'
  ? ['cdn.chelsea.michaeltobia.com', 'api.chelsea.michaeltobia.com']
  : ['localhost:3001', 'localhost:4000'];


const provideStateConfig = {
  graphqlEndpoint: {
    server: graphqlEndpoint,
    client: graphqlEndpoint,
  },
};

const appConfig = {
  csp,
  corsOrigins,
  provideStateConfig,
  appCompatibility: '5.x.x',
};

export default appConfig;
