// reducers/districtReducer.js
import { FETCH_DISTRICTS_FAILURE, FETCH_DISTRICTS_REQUEST, FETCH_DISTRICTS_SUCCESS } from './../actions/districtAction';

  
  const initialState = {
    loading: false,
    districts: [],
    error: '',
  };
  
  const districtReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DISTRICTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DISTRICTS_SUCCESS:
        return {
          ...state,
          loading: false,
          districts: action.payload,
          error: '',
        };
      case FETCH_DISTRICTS_FAILURE:
        return {
          ...state,
          loading: false,
          districts: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default districtReducer;
  