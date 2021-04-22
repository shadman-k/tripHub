import * as types from '../constants/actionTypes';

const initialState = {
  open: false,
}

const newTripModalReducer = (state = initialState, action) => {
  switch(action.type){
    case types.NEWTRIP: {
      return {
        ...state,
        open: action.payload
      };
    }
    default: {
      return state;
    }
  };
};

export default newTripModalReducer;