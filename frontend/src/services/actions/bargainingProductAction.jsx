import axios from "axios";

export const FETCH_BARGAINING_PRODUCTS_REQUEST = "FETCH_BARGAINING_PRODUCTS_REQUEST";
export const FETCH_BARGAINING_PRODUCTS_SUCCESS = "FETCH_BARGAINING_PRODUCTS_SUCCESS";
export const FETCH_BARGAINING_PRODUCTS_FAILURE = "FETCH_BARGAINING_PRODUCTS_FAILURE";

export const fetchBargainingProductsRequest = () => ({
  type: FETCH_BARGAINING_PRODUCTS_REQUEST,
});

export const fetchBargainingProductsSuccess = (bargainingProducts) => ({
  type: FETCH_BARGAINING_PRODUCTS_SUCCESS,
  payload: bargainingProducts,
});

export const fetchBargainingProductsFailure = (error) => ({
  type: FETCH_BARGAINING_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchBargainingProducts = () => {
  return (dispatch) => {
    dispatch(fetchBargainingProductsRequest());
    axios
      .get("https://api.banglamartecommerce.com.bd/product/get-bargaining")
      .then((response) => {
        const bargainingProducts = response.data;
        dispatch(fetchBargainingProductsSuccess(bargainingProducts));
      })
      .catch((error) => {
        dispatch(fetchBargainingProductsFailure(error.message));
      });
  };
};
