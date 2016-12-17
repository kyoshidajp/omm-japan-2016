import { applyMiddleware, compose, createStore } from 'redux';
import Thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function createFinalStore() {
  const finalCreateStore = compose(applyMiddleware(Thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
  return finalCreateStore(rootReducer);
}
