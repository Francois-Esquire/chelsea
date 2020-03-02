import {
  addGraphQLEndpoints,
  configureIguazuGraphQL,
} from 'iguazu-graphql';

export const endpointName = 'api-endpoint';

export function configureIguazu() {
  configureIguazuGraphQL({
    getToState: (state) => state.getIn(['modules', 'chelsea-root', 'graphql']),
  });

  addGraphQLEndpoints([
    {
      name: endpointName,
      fetch: () => ({ url: 'http://localhost:4000/graphql' }),
    },
  ]);
}
