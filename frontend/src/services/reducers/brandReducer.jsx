import { FETCH_BRAND_FAILURE, FETCH_BRAND_REQUEST, FETCH_BRAND_SUCCESS } from "../actions/brandAction";


  
  const initialState = {
    loading: false,
    brand: [],
    error: '',
  };
  
  const brandReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          brand: action.payload,
          error: '',
        };
      case FETCH_BRAND_FAILURE:
        return {
          ...state,
          loading: false,
          brand: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default brandReducer;
  