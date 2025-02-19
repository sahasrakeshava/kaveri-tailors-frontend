// Action.js
import { api } from "../../config/apiConfig";
import {
  API_ERROR,
  CREATE_REVIEW,
  FETCH_REVIEWS,
  CREATE_REVIEW_SUCCESS,
  FETCH_REVIEWS_SUCCESS,
} from "./ActionType";

// Create Review
export const createReview = (reviewData) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW });

  try {
    console.log("data and id:", reviewData);
    const response = await api.post("api/reviews/create", reviewData);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

// Fetch Reviews by Product ID
export const fetchReviews = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_REVIEWS });

  try {
    console.log("pid:", productId);
    const response = await api.get(`api/reviews/product/${productId}`);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};
