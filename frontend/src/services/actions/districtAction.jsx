// actions/divisionActions.js

import axios from "axios";

export const FETCH_DISTRICTS_REQUEST = "FETCH_DISTRICTS_REQUEST";
export const FETCH_DISTRICTS_SUCCESS = "FETCH_DISTRICTS_SUCCESS";
export const FETCH_DISTRICTS_FAILURE = "FETCH_DISTRICTS_FAILURE";

export const fetchDistrictsRequest = () => ({
  type: FETCH_DISTRICTS_REQUEST,
});

export const fetchDistrictsSuccess = (districts) => ({
  type: FETCH_DISTRICTS_SUCCESS,
  payload: districts,
});

export const fetchDistrictsFailure = (error) => ({
  type: FETCH_DISTRICTS_FAILURE,
  payload: error,
});

export const fetchDistricts = () => {
  return (dispatch) => {
    dispatch(fetchDistrictsRequest());
    axios
      .get("districts.json")
      .then((response) => {
        const districts = response.data;
        dispatch(fetchDistrictsSuccess(districts));
      })
      .catch((error) => {
        dispatch(fetchDistrictsFailure(error.message));
      });
  };
};
