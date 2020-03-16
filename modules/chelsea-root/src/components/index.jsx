import { compose } from 'redux';
import { connect } from 'react-redux';
import { holocronModule } from 'holocron';
import { connectAsync } from 'iguazu';
import { configureIguazuSSR } from 'iguazu-holocron';

import { moduleName as name } from '../config';
import reducer, { addPlayer, removePlayer, queryPlayers } from '../ducks';

import Chelsea from './Chelsea';

if (!global.BROWSER) {
  Chelsea.loadModuleData = configureIguazuSSR;
  // eslint-disable-next-line global-require
  Chelsea.appConfig = require('../config').appConfig;
}

function loadDataAsProps({ store: { dispatch } }) {
  return {
    players: () => queryPlayers(dispatch)(),
  };
}
loadDataAsProps.ssr = true;

Chelsea.loadDataAsProps = loadDataAsProps;

export default compose(
  holocronModule({
    name,
    reducer,
  }),
  connectAsync({ loadDataAsProps }),
  connect(undefined, {
    addPlayer,
    removePlayer,
    queryPlayers,
  })
)(Chelsea);
