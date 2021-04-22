import * as types from '../constants/actionTypes';

const initialState = {
  members: [],
}

const membersReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADDMEMBERS: {

      const members = action.payload;
      const newMembers = state.members.slice();

      members.forEach((member) => {
        newMembers.push(member);
      })

      return {
        ...state,
        newMembers,
      };
    }
    default: {
      return state;
    }
  };
};

export default membersReducer;