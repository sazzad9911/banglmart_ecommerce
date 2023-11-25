import { FETCH_FLASH_SALE_DATA_FAILURE, FETCH_FLASH_SALE_DATA_REQUEST, FETCH_FLASH_SALE_DATA_SUCCESS } from "../actions/flashSellDataAction";

  
  const initialState = {
    loading: false,
    flashSellData: [],
    error: '',
  };
  
  const flashSellDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FLASH_SALE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_FLASH_SALE_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          flashSellData: action.payload,
          error: '',
        };
      case FETCH_FLASH_SALE_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          flashSellData: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default flashSellDataReducer;
  