import axios from "axios";

export const FETCH_ALL_SELLER_DATA_REQUEST = "FETCH_ALL_SELLER_DATA_REQUEST";
export const FETCH_ALL_SELLER_DATA_SUCCESS = "FETCH_ALL_SELLER_DATA_SUCCESS";
export const FETCH_ALL_SELLER_DATA_FAILURE = "FETCH_ALL_SELLER_DATA_FAILURE";

export const fetchAllSellerDataRequest = () => ({
  type: FETCH_ALL_SELLER_DATA_REQUEST,
});

export const fetchAllSellerDataSuccess = (allSellerData) => ({
  type: FETCH_ALL_SELLER_DATA_SUCCESS,
  payload: allSellerData,
});

export const fetchAllSellerDataFailure = (error) => ({
  type: FETCH_ALL_SELLER_DATA_FAILURE,
  payload: error,
});

export const fetchAllSellerData = () => {
  return (dispatch) => {
    dispatch(fetchAllSellerDataRequest());
    axios
      .get('https://api.banglamartecommerce.com.bd/store/allSeller?verified=1')
      .then((response) => {
        const allSellerData = response.data;
        dispatch(fetchAllSellerDataSuccess(allSellerData));
      })
      .catch((error) => {
        dispatch(fetchAllSellerDataFailure(error.message));
      });
  };
};
