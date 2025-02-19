import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false, // Indicates if the API call is in progress
  success: false, // Tracks the success of payment creation or update
  paymentDetails: null, // Stores the payment details (if any)
  error: null, // Stores error messages if any
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case CREATE_PAYMENT_SUCCESS:
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        paymentDetails: action.payload, // Store payment details (if provided)
        error: null,
      };

    case CREATE_PAYMENT_FAILURE:
    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload, // Store error message
      };

    default:
      return state;
  }
};

export default paymentReducer;
