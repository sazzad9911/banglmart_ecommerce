// reducers/divisionReducer.js

import {
    FETCH_DIVISIONS_REQUEST,
    FETCH_DIVISIONS_SUCCESS,
    FETCH_DIVISIONS_FAILURE,
  } from '../actions/divisionActions';
  
  const initialState = {
    loading: false,
    divisions: [],
    error: '',
  };
  
  const divisionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DIVISIONS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DIVISIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          divisions: action.payload,
          error: '',
        };
      case FETCH_DIVISIONS_FAILURE:
        return {
          ...state,
          loading: false,
          divisions: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default divisionReducer;
  