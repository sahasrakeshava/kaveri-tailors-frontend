import { api } from "../../config/apiConfig";

export const FETCH_SEARCH_RESULTS_PENDING = "FETCH_SEARCH_RESULTS_PENDING";
export const FETCH_SEARCH_RESULTS_FULFILLED = "FETCH_SEARCH_RESULTS_FULFILLED";
export const FETCH_SEARCH_RESULTS_REJECTED = "FETCH_SEARCH_RESULTS_REJECTED";

export const fetchSearchResults = (query) => {
  return (dispatch) => {
    dispatch({ type: FETCH_SEARCH_RESULTS_PENDING });

    api
      .get(`/api/search?query=${encodeURIComponent(query)}`)
      .then((response) => {
        dispatch({
          type: FETCH_SEARCH_RESULTS_FULFILLED,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SEARCH_RESULTS_REJECTED,
          payload: error.message,
        });
      });
  };
};
