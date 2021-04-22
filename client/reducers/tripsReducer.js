import * as types from '../constants/actionTypes';

const initialState = {
  trips: []
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADDTRIP: {
      const newTrip = {
        name: action.payload.name,
        destination: action.payload.destination,
        dateStart: action.payload.dateStart,
        dateEnd: action.payload.dateEnd,
        createdBy: action.payload.createdBy
      }
      const trips = state.trips.slice();
      trips.unshift(newTrip);
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