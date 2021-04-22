import * as types from '../constants/actionTypes';

const initialState = {
  trips: []
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADDTRIP: {
      const newTrip = {
        name: action.payload.name,
        destination: action.payload.dest,
        dateStart: action.payload.start,
        dateEnd: action.payload.end,
        createdBy: action.payload.createdBy
      }
      const trips = state.trips.slice();
      trips.push(newTrip);
      return {
        ...state,
        trips: trips,
      };
    }
    case types.GETTRIPS: {
      //FETCH TRIPS HERE

      return {
        ...state,
        trips: []
      }
    }
    default: {
      return state;
    }
  };
};

export default tripsReducer;