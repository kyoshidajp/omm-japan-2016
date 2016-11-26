import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import OMMApp from './components/OMMApp';
import createFinalStore from './store';

const store = createFinalStore();

render(
  <Provider store={store}>
    <OMMApp />
  </Provider>,
  document.getElementById('app')
);
