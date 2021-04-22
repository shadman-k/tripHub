// import all reducers here
import authReducer from './authReducer';
import newTripModalReducer from './newTripModalReducer';
import tripsReducer from './tripsReducer';
import newStopReducer from './newStopReducer';
import membersReducer from './membersReducer';

import { combineReducers } from 'redux';
// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  auth: authReducer,
  newTrip: newTripModalReducer,
  trips: tripsReducer,
  stops: newStopReducer,
  members: membersReducer
});

export default reducers;