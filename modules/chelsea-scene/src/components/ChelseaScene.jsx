import React from 'react';
import { Route } from '@americanexpress/one-app-router';

import Scene from './Scene';

const ChelseaScene = () => (
  <Scene />
);

// Read about childRoutes:
// https://github.com/americanexpress/one-app/blob/master/docs/api/modules/Routing.md#childroutes
ChelseaScene.childRoutes = () => ([
  <Route path="/" />,
]);

// Read about appConfig:
// https://github.com/americanexpress/one-app/blob/master/docs/api/modules/App-Configuration.md
if (!global.BROWSER) {
  // eslint-disable-next-line global-require
  ChelseaScene.appConfig = require('../appConfig').default;
}

export default ChelseaScene;
