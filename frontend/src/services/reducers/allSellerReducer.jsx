// reducers/districtReducer.js

import { FETCH_ALL_SELLER_DATA_FAILURE, FETCH_ALL_SELLER_DATA_REQUEST, FETCH_ALL_SELLER_DATA_SUCCESS } from "../actions/allSellerAction";


  
  const initialState = {
    loading: false,
    allSeller: [],
    error: '',
  };
  
  const allSellerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_SELLER_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ALL_SELLER_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          allSeller: action.payload,
          error: '',
        };
      case FETCH_ALL_SELLER_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          allSeller: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default allSellerReducer;
  