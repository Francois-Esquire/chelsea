import {
  graphqlReducer,
  queryGraphQLData,
  mutateGraphQLData,
  addGraphQLEndpoints,
  configureIguazuGraphQL,
} from 'iguazu-graphql';

import {
  moduleName,
} from '../config';

import {
  addPlayer as AddPlayer,
  removePlayer as RemovePlayer,
  queryPlayers as QueryPlayers,
} from '../graphql';

export default graphqlReducer;

export const endpointName = 'api-endpoint';
export const graphqlStateKey = 'graphql';
export const graphqlEndpoint = 'http://localhost:4000/graphql';

export function configureIguazu() {
  configureIguazuGraphQL({
    getToState: (state) => state.getIn(['modules', moduleName, graphqlStateKey]),
  });

  addGraphQLEndpoints([
    {
      name: endpointName,
      fetch: () => ({ url: graphqlEndpoint }),
    },
  ]);
}

export function queryPlayers(dispatch) {
  return () => dispatch(
    queryGraphQLData({
      endpointName,
      ...QueryPlayers(),
    })
  );
}

export function addPlayer(dispatch) {
  return ({ username }) => dispatch(
    mutateGraphQLData({
      endpointName,
      ...AddPlayer({ username }),
    })
  );
}

export function removePlayer(dispatch) {
  return ({ id }) => dispatch(
    mutateGraphQLData({
      endpointName,
      ...RemovePlayer({ id }),
    })
  );
}
