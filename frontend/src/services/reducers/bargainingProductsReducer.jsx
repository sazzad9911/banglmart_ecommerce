import { FETCH_BARGAINING_PRODUCTS_FAILURE, FETCH_BARGAINING_PRODUCTS_REQUEST, FETCH_BARGAINING_PRODUCTS_SUCCESS } from "../actions/bargainingProductAction";

  
  const initialState = {
    loading: false,
    bargainingProducts: [],
    error: '',
  };
  
  const bargainingProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BARGAINING_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BARGAINING_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          bargainingProducts: action.payload,
          error: '',
        };
      case FETCH_BARGAINING_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          bargainingProducts: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bargainingProductsReducer;
  