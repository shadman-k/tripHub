import * as types from '../constants/actionTypes';

const initialState = {
  user: 'Username'
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case types.AUTHENTICATE: {
      console.log(action.payload);
      return {
        ...state,
        user: 'Rob'
      };
    }
    default: {
      return state;
    }
  };
};

export default authReducer;