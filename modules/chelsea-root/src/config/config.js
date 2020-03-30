export const removeProtocol = (str) => str.replace(/^(https?:\/\/)/, '');

export const moduleName = 'chelsea-root';

export const appUrl = process.env.NODE_ENV === 'production' ? process.env.APP_URL : 'http://localhost:3000';
export const cdnUrl = process.env.NODE_ENV === 'production' ? process.env.CDN_URL : `http://localhost:${process.env.HTTP_ONE_APP_DEV_CDN_PORT || 3001}`;
export const graphqlUrl = process.env.NODE_ENV === 'production' ? `${appUrl}/graphql` : 'http://localhost:4000/graphql';

export const corsOrigins = [removeProtocol(cdnUrl || '')];

if (process.env.NODE_ENV === 'development') {
  corsOrigins.push('localhost:4000');
}

export const csp = {
  directives: {
    reportUri: `${appUrl}/_/report/security/csp-violation`,
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", removeProtocol(cdnUrl)],
    imgSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    connectSrc: ["'self'", graphqlUrl],
  },
};

export const graphqlEndpoint = {
  development: graphqlUrl,
  production: graphqlUrl,
};

export const modulesEndpoint = {
  development: cdnUrl,
  production: cdnUrl,
};
