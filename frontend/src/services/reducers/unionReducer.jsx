// reducers/unionReducer.js

import { FETCH_UNIONS_FAILURE, FETCH_UNIONS_REQUEST, FETCH_UNIONS_SUCCESS } from "../actions/unionAction";

  
  const initialState = {
    loading: false,
    unions: [],
    error: '',
  };
  
  const unionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UNIONS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_UNIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          unions: action.payload,
          error: '',
        };
      case FETCH_UNIONS_FAILURE:
        return {
          ...state,
          loading: false,
          unions: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default unionReducer;
  