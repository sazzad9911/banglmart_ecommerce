
import { FETCH_TOP_PRODUCTS_FAILURE, FETCH_TOP_PRODUCTS_REQUEST, FETCH_TOP_PRODUCTS_SUCCESS } from './../actions/topProductsAction';
  
  const initialState = {
    loading: false,
    topProduct: [],
    error: '',
  };
  
  const topProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOP_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_TOP_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          topProduct: action.payload,
          error: '',
        };
      case FETCH_TOP_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          topProduct: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default topProductsReducer;
  