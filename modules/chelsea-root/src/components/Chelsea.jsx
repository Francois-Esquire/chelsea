import React from 'react';
import PropTypes from 'prop-types';
import { Route } from '@americanexpress/one-app-router';
import ModuleRoute from 'holocron-module-route';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { holocronModule } from 'holocron';
import { connectAsync } from 'iguazu';
import { configureIguazuSSR } from 'iguazu-holocron';
import { queryGraphQLData, mutateGraphQLData } from 'iguazu-graphql';

import reducer from '../duck';
import { endpointName, configureIguazu } from '../iguazu';
import { addPlayer, removePlayer, queryPlayers } from '../graphql';

import Styles from './styles';

const Chelsea = ({
  children, moduleState, isLoading, loadedWithErrors,
}) => {
  if (isLoading()) {
    return <p>Loading...</p>;
  }

  if (loadedWithErrors()) {
    return <p>Oh no! Something went wrong</p>;
  }

  return (
    <React.Fragment>
      <Styles />

      <div>{JSON.stringify(moduleState, null, 2)}</div>

      {children}
    </React.Fragment>
  );
};

Chelsea.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.func.isRequired,
  loadedWithErrors: PropTypes.func.isRequired,
  moduleState: PropTypes.shape({
    graphql: PropTypes.shape({}),
  }).isRequired,
};

Chelsea.defaultProps = {
  children: null,
};

Chelsea.childRoutes = (store) => [
  <Route path="/">
    <ModuleRoute path="/" moduleName="chelsea-scene" store={store} />
  </Route>,
  <ModuleRoute path="scene" moduleName="chelsea-scene" />,
];

function mapDispatchToProps(dispatch) {
  return {
    addPlayer: ({ username }) => dispatch(
      mutateGraphQLData({
        endpointName,
        ...addPlayer({ username }),
      })
    ),
    removePlayer: ({ id }) => dispatch(
      mutateGraphQLData({
        endpointName,
        ...removePlayer({ id }),
      })
    ),
    queryPlayers: () => dispatch(
      queryGraphQLData({
        endpointName,
        ...queryPlayers(),
      })
    ),
  };
}

function loadDataAsProps({
  store: { dispatch },
}) {
  return {
    data: () => dispatch(
      queryGraphQLData({
        endpointName,
        ...queryPlayers(),
      })
    ),
  };
}

loadDataAsProps.ssr = true;

Chelsea.loadDataAsProps = loadDataAsProps;

configureIguazu();

if (!global.BROWSER) {
  Chelsea.loadModuleData = configureIguazuSSR;
  // eslint-disable-next-line global-require
  Chelsea.appConfig = require('../appConfig').default;
}

export default compose(
  holocronModule({
    name: 'chelsea-root',
    reducer,
  }),
  connectAsync({ loadDataAsProps }),
  connect(undefined, mapDispatchToProps)
)(Chelsea);
