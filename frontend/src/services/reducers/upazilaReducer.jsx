// reducers/upazilaReducer.js

import { FETCH_UPAZILAS_FAILURE, FETCH_UPAZILAS_REQUEST, FETCH_UPAZILAS_SUCCESS } from "../actions/upazilaAction";


  
  const initialState = {
    loading: false,
    upazilas: [],
    error: '',
  };
  
  const upazilaReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UPAZILAS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_UPAZILAS_SUCCESS:
        return {
          ...state,
          loading: false,
          upazilas: action.payload,
          error: '',
        };
      case FETCH_UPAZILAS_FAILURE:
        return {
          ...state,
          loading: false,
          upazilas: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default upazilaReducer;
  