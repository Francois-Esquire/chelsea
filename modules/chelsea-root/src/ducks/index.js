import { combineReducers } from 'redux-immutable';

import graphqlReducer, { configureIguazu, graphqlStateKey } from './graphql';

export {
  addPlayer,
  removePlayer,
  queryPlayers,
} from './graphql';

configureIguazu();

export default combineReducers({
  [graphqlStateKey]: graphqlReducer,
});
