// actions/divisionActions.js

import axios from "axios";

export const FETCH_DIVISIONS_REQUEST = "FETCH_DIVISIONS_REQUEST";
export const FETCH_DIVISIONS_SUCCESS = "FETCH_DIVISIONS_SUCCESS";
export const FETCH_DIVISIONS_FAILURE = "FETCH_DIVISIONS_FAILURE";

export const fetchDivisionsRequest = () => ({
  type: FETCH_DIVISIONS_REQUEST,
});

export const fetchDivisionsSuccess = (divisions) => ({
  type: FETCH_DIVISIONS_SUCCESS,
  payload: divisions,
});

export const fetchDivisionsFailure = (error) => ({
  type: FETCH_DIVISIONS_FAILURE,
  payload: error,
});

export const fetchDivisions = () => {
  return (dispatch) => {
    dispatch(fetchDivisionsRequest());
    axios
      .get("divisions.json")
      .then((response) => {
        const divisions = response.data;
        dispatch(fetchDivisionsSuccess(divisions));
      })
      .catch((error) => {
        dispatch(fetchDivisionsFailure(error.message));
      });
  };
};
