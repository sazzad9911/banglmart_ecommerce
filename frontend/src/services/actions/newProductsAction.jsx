import axios from "axios";

export const FETCH_NEW_PRODUCTS_REQUEST = "FETCH_NEW_PRODUCTS_REQUEST";
export const FETCH_NEW_PRODUCTS_SUCCESS = "FETCH_NEW_PRODUCTS_SUCCESS";
export const FETCH_NEW_PRODUCTS_FAILURE = "FETCH_NEW_PRODUCTS_FAILURE";

export const fetchNewProductsRequest = () => ({
  type: FETCH_NEW_PRODUCTS_REQUEST,
});

export const fetchNewProductsSuccess = (newProduct) => ({
  type: FETCH_NEW_PRODUCTS_SUCCESS,
  payload: newProduct,
});

export const fetchNewProductsFailure = (error) => ({
  type: FETCH_NEW_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchNewProducts = () => {
  return (dispatch) => {
    dispatch(fetchNewProductsRequest());
    axios
      .get("https://banglamartecommerce.com.bd/product/get/new")
      .then((response) => {
        const newProduct = response.data;
        dispatch(fetchNewProductsSuccess(newProduct));
      })
      .catch((error) => {
        dispatch(fetchNewProductsFailure(error.message));
      });
  };
};
