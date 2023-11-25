// reducers/districtReducer.js

import { FETCH_FLASH_SALE_FAILURE, FETCH_FLASH_SALE_REQUEST, FETCH_FLASH_SALE_SUCCESS } from "../actions/flashSellCheckAction";

  
  const initialState = {
    loading: false,
    flashSell: [],
    error: '',
  };
  
  const flashSellReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FLASH_SALE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_FLASH_SALE_SUCCESS:
        return {
          ...state,
          loading: false,
          flashSell: action.payload,
          error: '',
        };
      case FETCH_FLASH_SALE_FAILURE:
        return {
          ...state,
          loading: false,
          flashSell: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default flashSellReducer;
  