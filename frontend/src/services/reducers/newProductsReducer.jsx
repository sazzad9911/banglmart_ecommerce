import { FETCH_NEW_PRODUCTS_FAILURE, FETCH_NEW_PRODUCTS_REQUEST, FETCH_NEW_PRODUCTS_SUCCESS } from "../actions/newProductsAction";

  
  const initialState = {
    loading: false,
    newProduct: [],
    error: '',
  };
  
  const newProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NEW_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_NEW_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          newProduct: action.payload,
          error: '',
        };
      case FETCH_NEW_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          newProduct: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default newProductsReducer;
  