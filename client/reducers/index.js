// import all reducers here
import authReducer from './authReducer';

import { combineReducers } from 'redux';
// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  auth: authReducer
});

export default reducers;