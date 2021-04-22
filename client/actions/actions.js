import * as types from '../constants/actionTypes';

export const authenticate = (isAuthenticated) => ({
  type: types.AUTHENTICATE,
  payload: isAuthenticated
});

export const getUserId = (userId) => ({
  type: types.GETUSERID,
  payload: userId
})

export const newTrip = (modalState) => ({
  type: types.NEWTRIP,
  payload: modalState
});

export const addTrip = (tripInfo) => ({
  type: types.ADDTRIP,
  payload: tripInfo
});

export const getTrips = (userId) => ({
  type: types.GETTRIPS,
  payload: userId
});

export const setCurrTrip = (currTripId) => ({
  type: types.SETCURRTRIP,
  payload: currTripId
})

export const setNewStop = (modalState) => ({
  type: types.NEWSTOP,
  payload: modalState
})

export const addStop = (stopInfo) => ({
  type: types.ADDSTOP,
  payload: stopInfo
})

export const reset = () => ({
  type: types.RESET
})

export const addMembers = (members) => ({
  type: types.ADDMEMBERS,
  payload: members
})