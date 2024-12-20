// Reducer.js
import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  API_ERROR,
  CREATE_REVIEW,
  FETCH_REVIEWS,
  CREATE_REVIEW_SUCCESS,
  FETCH_REVIEWS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  product: null,
  reviews: [],
  products: [],
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
    case FETCH_PRODUCT:
    case CREATE_REVIEW:
    case FETCH_REVIEWS:
      return { ...state, loading: true, error: null };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, action.payload],
      };

    case FETCH_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };

    case API_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
