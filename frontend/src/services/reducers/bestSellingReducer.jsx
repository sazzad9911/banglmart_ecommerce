import { FETCH_BEST_SELLING_PRODUCTS_FAILURE, FETCH_BEST_SELLING_PRODUCTS_REQUEST, FETCH_BEST_SELLING_PRODUCTS_SUCCESS } from "../actions/bestSellingAction";

  
  const initialState = {
    loading: false,
    bestSellingProduct: [],
    error: '',
  };
  
  const bestSellingProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BEST_SELLING_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BEST_SELLING_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          bestSellingProduct: action.payload,
          error: '',
        };
      case FETCH_BEST_SELLING_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          bestSellingProduct: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bestSellingProductsReducer;
  