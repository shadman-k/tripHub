import * as types from '../constants/actionTypes';

export const authenticate = (isAuthenticated) => ({
  type: types.AUTHENTICATE,
  payload: isAuthenticated,
});