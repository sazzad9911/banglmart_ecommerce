import axios from "axios";

export const FETCH_BEST_SELLING_PRODUCTS_REQUEST = "FETCH_BEST_SELLING_PRODUCTS_REQUEST";
export const FETCH_BEST_SELLING_PRODUCTS_SUCCESS = "FETCH_BEST_SELLING_PRODUCTS_SUCCESS";
export const FETCH_BEST_SELLING_PRODUCTS_FAILURE = "FETCH_BEST_SELLING_PRODUCTS_FAILURE";

export const fetchBestSellingProductsRequest = () => ({
  type: FETCH_BEST_SELLING_PRODUCTS_REQUEST,
});

export const fetchBestSellingProductsSuccess = (bestSellingProduct) => ({
  type: FETCH_BEST_SELLING_PRODUCTS_SUCCESS,
  payload: bestSellingProduct,
});

export const fetchBestSellingProductsFailure = (error) => ({
  type: FETCH_BEST_SELLING_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchBestSellingProducts = () => {
  return (dispatch) => {
    dispatch(fetchBestSellingProductsRequest());
    axios
      .get("https://banglamartecommerce.com.bd/product/get/top/sell")
      .then((response) => {
        const bestSellingProduct = response.data;
        dispatch(fetchBestSellingProductsSuccess(bestSellingProduct));
      })
      .catch((error) => {
        dispatch(fetchBestSellingProductsFailure(error.message));
      });
  };
};
