import axios from "axios";

export const FETCH_FLASH_SALE_DATA_REQUEST = "FETCH_FLASH_SALE_DATA_REQUEST";
export const FETCH_FLASH_SALE_DATA_SUCCESS = "FETCH_FLASH_SALE_DATA_SUCCESS";
export const FETCH_FLASH_SALE_DATA_FAILURE = "FETCH_FLASH_SALE_DATA_FAILURE";

export const fetchFlashSellDataRequest = () => ({
  type: FETCH_FLASH_SALE_DATA_REQUEST,
});

export const fetchFlashSellDataSuccess = (flashSellData) => ({
  type: FETCH_FLASH_SALE_DATA_SUCCESS,
  payload: flashSellData,
});

export const fetchFlashSellDataFailure = (error) => ({
  type: FETCH_FLASH_SALE_DATA_FAILURE,
  payload: error,
});

export const fetchFlashSellData = (id) => {
  return (dispatch) => {
    dispatch(fetchFlashSellDataRequest());
    axios
      .get(`https://api.banglamartecommerce.com.bd/product/get/flash/product?flashSellId=${id}`)
      .then((response) => {
        const flashSellData = response.data;
        dispatch(fetchFlashSellDataSuccess(flashSellData));
      })
      .catch((error) => {
        dispatch(fetchFlashSellDataFailure(error.message));
      });
  };
};
