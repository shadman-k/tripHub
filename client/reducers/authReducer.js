import * as types from '../constants/actionTypes';

const initialState = {
  user: 'Username',
  userId: null
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
    case types.GETUSERID: {
      return {
        ...state,
        userId: action.payload
      }
    }
    default: {
      return state;
    }
  };
};

export default authReducer;