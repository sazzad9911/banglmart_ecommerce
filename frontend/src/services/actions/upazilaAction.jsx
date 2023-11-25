// actions/divisionActions.js

import axios from "axios";

export const FETCH_UPAZILAS_REQUEST = "FETCH_UPAZILAS_REQUEST";
export const FETCH_UPAZILAS_SUCCESS = "FETCH_UPAZILAS_SUCCESS";
export const FETCH_UPAZILAS_FAILURE = "FETCH_UPAZILAS_FAILURE";

export const fetchUpazilasRequest = () => ({
  type: FETCH_UPAZILAS_REQUEST,
});

export const fetchUpazilasSuccess = (upazilas) => ({
  type: FETCH_UPAZILAS_SUCCESS,
  payload: upazilas,
});

export const fetchUpazilasFailure = (error) => ({
  type: FETCH_UPAZILAS_FAILURE,
  payload: error,
});

export const fetchUpazilas = () => {
  return (dispatch) => {
    dispatch(fetchUpazilasRequest());
    axios
      .get("subDistricts.json")
      .then((response) => {
        const upazilas = response.data;
        dispatch(fetchUpazilasSuccess(upazilas));
      })
      .catch((error) => {
        dispatch(fetchUpazilasFailure(error.message));
      });
  };
};
