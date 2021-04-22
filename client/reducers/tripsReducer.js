import * as types from '../constants/actionTypes';

const initialState = {
  trips: []
}

const tripsReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADDTRIP: {
      const newTrip = {
        trip_name: action.payload.trip_name,
        destination: action.payload.destination,
        datestart: action.payload.datestart,
        dateend: action.payload.dateend,
        createdby: action.payload.createdby,
        trip_id: action.payload.trip_id,
        members: action.payload.members,
        list_of_stops: action.payload.lists_of_stops
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