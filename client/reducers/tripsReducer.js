import * as types from '../constants/actionTypes';

const initialState = {
  trips: []
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADDTRIP: {
      const newTrip = {
        name: action.payload.name,
        dest: action.payload.dest,
        start: action.payload.start,
        end: action.payload.end
      }
      const trips = state.trips.slice();
      trips.push(newTrip);
      return {
        ...state,
        trips: trips
      };
    }
    case types.GETTRIPS: {
      //FETCH TRIPS HERE

      return {
        ...state
      }
    }
    default: {
      return state;
    }
  };
};

export default tripsReducer;