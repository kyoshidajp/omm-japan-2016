import { combineReducers } from 'redux';
import omm from './reducers/OMM';

const rootReducer = combineReducers({
  omm,
});

export default rootReducer;
