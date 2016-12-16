import { applyMiddleware, compose, createStore } from 'redux';
import Thunk from 'redux-thunk';

import rootReducer from './reducers';
import DevTools from './dev-tools';

export default function createFinalStore() {
  const finalCreateStore = compose(applyMiddleware(Thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
  return finalCreateStore(rootReducer);
}
