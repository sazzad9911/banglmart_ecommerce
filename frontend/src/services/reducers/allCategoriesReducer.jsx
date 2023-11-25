import { FETCH_ALL_CATEGORIES_FAILURE, FETCH_ALL_CATEGORIES_REQUEST, FETCH_ALL_CATEGORIES_SUCCESS } from "../actions/allCategoriesAction";

  
  const initialState = {
    loading: false,
    AllCategories: [],
    error: '',
  };
  
  const allCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ALL_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          AllCategories: action.payload,
          error: '',
        };
      case FETCH_ALL_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          AllCategories: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default allCategoriesReducer;
  