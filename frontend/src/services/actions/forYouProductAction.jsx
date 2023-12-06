import axios from "axios";

export const FETCH_FOR_YOU_PRODUCTS_REQUEST = "FETCH_FOR_YOU_PRODUCTS_REQUEST";
export const FETCH_FOR_YOU_PRODUCTS_SUCCESS = "FETCH_FOR_YOU_PRODUCTS_SUCCESS";
export const FETCH_FOR_YOU_PRODUCTS_FAILURE = "FETCH_FOR_YOU_PRODUCTS_FAILURE";

export const fetchForYouProductsRequest = () => ({
  type: FETCH_FOR_YOU_PRODUCTS_REQUEST,
});

export const fetchForYouProductsSuccess = (forYouProducts) => ({
  type: FETCH_FOR_YOU_PRODUCTS_SUCCESS,
  payload: forYouProducts,
});

export const fetchForYouProductsFailure = (error) => ({
  type: FETCH_FOR_YOU_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchForYouProducts = () => {
    const visitorId = localStorage.getItem('visitorId')
  return (dispatch) => {
    dispatch(fetchForYouProductsRequest());
    axios
      .get(`https://api.banglamartecommerce.com.bd/product/get/for-you?visitorId=${visitorId}`)
      .then((response) => {
        const forYouProducts = response.data;
        dispatch(fetchForYouProductsSuccess(forYouProducts));
      })
      .catch((error) => {
        dispatch(fetchForYouProductsFailure(error.message));
      });
  };
};
