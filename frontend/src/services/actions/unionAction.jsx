// actions/divisionActions.js

import axios from "axios";

export const FETCH_UNIONS_REQUEST = "FETCH_UNIONS_REQUEST";
export const FETCH_UNIONS_SUCCESS = "FETCH_UNIONS_SUCCESS";
export const FETCH_UNIONS_FAILURE = "FETCH_UNIONS_FAILURE";

export const fetchUnionsRequest = () => ({
  type: FETCH_UNIONS_REQUEST,
});

export const fetchUnionsSuccess = (unions) => ({
  type: FETCH_UNIONS_SUCCESS,
  payload: unions,
});

export const fetchUnionsFailure = (error) => ({
  type: FETCH_UNIONS_FAILURE,
  payload: error,
});

export const fetchUnions = () => {
  return (dispatch) => {
    dispatch(fetchUnionsRequest());
    axios
      .get("unions.json")
      .then((response) => {
        const unions = response.data;
        dispatch(fetchUnionsSuccess(unions));
      })
      .catch((error) => {
        dispatch(fetchUnionsFailure(error.message));
      });
  };
};
