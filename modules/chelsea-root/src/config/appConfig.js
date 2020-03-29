import contentSecurityPolicyBuilder from 'content-security-policy-builder';

import { corsOrigins, graphqlEndpoint, csp } from './config';

const appConfig = {
  csp: contentSecurityPolicyBuilder(csp),
  corsOrigins,
  provideStateConfig: {
    graphqlEndpoint: {
      server: graphqlEndpoint,
      client: graphqlEndpoint,
    },
  },
  appCompatibility: '5.x.x',
};

export default appConfig;
