import { api } from "../../../config/apiConfig";
import {
  CANCELLED_ORDER_FAILURE,
  CANCELLED_ORDER_REQUEST,
  CANCELLED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
      const response = await api.get(`/api/admin/orders/`);
      console.log("get all orders api data --", response.data);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
  };
};
export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    console.log("data---", response);
    const data = response.data;
    console.log("confimed_order", data);
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
  }
};

export const shipOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SHIP_ORDER_REQUEST });
      const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
      console.log("shipped order", data);
      dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    const data = response.data;
    console.log("deliver_data", data);
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELLED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    const data = response.data;
    console.log("cancelled order", data);
    dispatch({ type: CANCELLED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CANCELLED_ORDER_FAILURE, payload: error.message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/delete`);
    const data = response.data;
    console.log("deleted order", data);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};
