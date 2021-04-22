import * as types from '../constants/actionTypes';

const initialState = {
  trips: [],
  currTrip: null,
  stops: []
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
    case types.SETCURRTRIP: {
      return {
        ...state,
        currTrip: action.payload
      }
    }
    case types.ADDSTOP: {
      const newStop = {
        createdby: action.payload.createdby,
        destination: action.payload.destination,
        downvotes: action.payload.downvotes,
        googlemapsid: action.payload.googlemapsid,
        groupid: action.payload.groupid,
        stop_id: action.payload.stop_id,
        stop_name: action.payload.stops_name,
        tripid: action.payload.tripid,
        upvotes: action.payload.upvotes,
      }
      const stops = state.stops.slice();
      stops.push(newStop);
      return {
        ...state,
        stops: stops
      }
    }
    case types.RESET: {
      return {
        ...state,
        trips: [],
        stops: [],
        currTrip: null
      }
    }
    default: {
      return state;
    }
  };
};

export default tripsReducer;