import axios from "axios";

export const FETCH_FLASH_SALE_REQUEST = "FETCH_FLASH_SALE_REQUEST";
export const FETCH_FLASH_SALE_SUCCESS = "FETCH_FLASH_SALE_SUCCESS";
export const FETCH_FLASH_SALE_FAILURE = "FETCH_FLASH_SALE_FAILURE";

export const fetchFlashSellRequest = () => ({
  type: FETCH_FLASH_SALE_REQUEST,
});

export const fetchFlashSellSuccess = (flashSell) => ({
  type: FETCH_FLASH_SALE_SUCCESS,
  payload: flashSell,
});

export const fetchFlashSellFailure = (error) => ({
  type: FETCH_FLASH_SALE_FAILURE,
  payload: error,
});

export const fetchFlashSell = () => {
  return (dispatch) => {
    dispatch(fetchFlashSellRequest());
    axios
      .get("https://api.banglamartecommerce.com.bd/product/get/flash")
      .then((response) => {
        const flashSell = response.data;
        dispatch(fetchFlashSellSuccess(flashSell));
      })
      .catch((error) => {
        dispatch(fetchFlashSellFailure(error.message));
      });
  };
};
