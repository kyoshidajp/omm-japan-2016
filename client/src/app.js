import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './containers/appContainer';
import createFinalStore from './store';

const store = createFinalStore();

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
