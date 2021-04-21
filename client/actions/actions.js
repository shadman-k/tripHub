import * as types from '../constants/actionTypes';

export const authenticate = (isAuthenticated) => ({
  type: types.AUTHENTICATE,
  payload: isAuthenticated,
});

export const newTrip = (modalState) => ({
  type: types.NEWTRIP,
  payload: modalState
});

export const addTrip = (tripInfo) => ({
  type: types.ADDTRIP,
  payload: tripInfo
});

export const getTrips = (userId) => ({
  types: types.GETTRIPS,
  payload: userId
});