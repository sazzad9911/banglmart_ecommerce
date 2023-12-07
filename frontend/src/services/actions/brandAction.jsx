import axios from "axios";

export const FETCH_BRAND_REQUEST = "FETCH_BRAND_REQUEST";
export const FETCH_BRAND_SUCCESS = "FETCH_BRAND_SUCCESS";
export const FETCH_BRAND_FAILURE = "FETCH_BRAND_FAILURE";

export const fetchBrandRequest = () => ({
  type: FETCH_BRAND_REQUEST,
});

export const fetchBrandSuccess = (brand) => ({
  type: FETCH_BRAND_SUCCESS,
  payload: brand,
});

export const fetchBrandFailure = (error) => ({
  type: FETCH_BRAND_FAILURE,
  payload: error,
});

export const fetchBrand = () => {
  return (dispatch) => {
    dispatch(fetchBrandRequest());
    axios
      .get("https://banglamartecommerce.com.bd/store/allBrand?verified=1")
      .then((response) => {
        const brand = response.data;
        dispatch(fetchBrandSuccess(brand));
      })
      .catch((error) => {
        dispatch(fetchBrandFailure(error.message));
      });
  };
};
