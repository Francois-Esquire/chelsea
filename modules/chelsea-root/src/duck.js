import { combineReducers } from 'redux-immutable';
import { graphqlReducer } from 'iguazu-graphql';

export default combineReducers({
  graphql: graphqlReducer,
});
