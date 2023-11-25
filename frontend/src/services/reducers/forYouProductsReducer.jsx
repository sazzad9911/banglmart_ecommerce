import { FETCH_FOR_YOU_PRODUCTS_FAILURE, FETCH_FOR_YOU_PRODUCTS_REQUEST, FETCH_FOR_YOU_PRODUCTS_SUCCESS } from "../actions/forYouProductAction";

  
  const initialState = {
    loading: false,
    forYouProducts: [],
    error: '',
  };
  
  const forYouProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FOR_YOU_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_FOR_YOU_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          forYouProducts: action.payload,
          error: '',
        };
      case FETCH_FOR_YOU_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          forYouProducts: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default forYouProductsReducer;
  