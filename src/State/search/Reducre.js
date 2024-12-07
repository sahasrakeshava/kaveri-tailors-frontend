import {
  FETCH_SEARCH_RESULTS_PENDING,
  FETCH_SEARCH_RESULTS_FULFILLED,
  FETCH_SEARCH_RESULTS_REJECTED,
} from "./Action";

const initialState = {
  results: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_PENDING:
      return {
        ...state,
        status: "loading",
      };
    case FETCH_SEARCH_RESULTS_FULFILLED:
      return {
        ...state,
        status: "succeeded",
        results: action.payload,
      };
    case FETCH_SEARCH_RESULTS_REJECTED:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
