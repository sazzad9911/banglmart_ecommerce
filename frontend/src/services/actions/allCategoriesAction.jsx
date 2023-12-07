
import axios from "axios";

export const FETCH_ALL_CATEGORIES_REQUEST = "FETCH_ALL_CATEGORIES_REQUEST";
export const FETCH_ALL_CATEGORIES_SUCCESS = "FETCH_ALL_CATEGORIES_SUCCESS";
export const FETCH_ALL_CATEGORIES_FAILURE = "FETCH_ALL_CATEGORIES_FAILURE";

export const fetchAllCategoriesRequest = () => ({
  type: FETCH_ALL_CATEGORIES_REQUEST,
});

export const fetchAllCategoriesSuccess = (allCategories) => ({
  type: FETCH_ALL_CATEGORIES_SUCCESS,
  payload: allCategories,
});

export const fetchAllCategoriesFailure = (error) => ({
  type: FETCH_ALL_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchAllCategories = () => {
  const url = "https://banglamartecommerce.com.bd";

  return (dispatch) => {
    dispatch(fetchAllCategoriesRequest());
    axios
      .get(`${url}/category/getAll`)
      .then((response) => {
        const allCategories = response.data;
        dispatch(fetchAllCategoriesSuccess(allCategories));
      })
      .catch((error) => {
        dispatch(fetchAllCategoriesFailure(error.message));
      });
  };
};
