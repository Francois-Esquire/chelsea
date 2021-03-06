import React from 'react';
import PropTypes from 'prop-types';
import ModuleRoute from 'holocron-module-route';

import Styles from './styles';

export default function Chelsea({
  children,
  // moduleState,
  isLoading,
  loadedWithErrors,
}) {
  if (isLoading()) {
    return <p>Loading...</p>;
  }

  if (loadedWithErrors()) {
    return <p>Oh no! Something went wrong</p>;
  }

  return (
    <React.Fragment>
      <Styles />

      {/* <div>{JSON.stringify(moduleState, null, 2)}</div> */}

      {children}
    </React.Fragment>
  );
}

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

Chelsea.childRoutes = () => [
  <ModuleRoute path="/*" moduleName="chelsea-scene" />,
  // why do both not match?
  <ModuleRoute path="/*" moduleName="chelsea-hud" />,
  // why does this not work?
  // <ModuleRoute path="/*" moduleName="chelsea-hud">
  //   <ModuleRoute path="/*" moduleName="chelsea-scene" />
  // </ModuleRoute>,
  // or this?
  // <ModuleRoute path="/" moduleName="chelsea-hud">
  //   <ModuleRoute moduleName="chelsea-scene" />
  // </ModuleRoute>,
];
