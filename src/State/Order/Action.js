import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ALL_ORDER_FAILURE,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("req data", reqData);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    console.log("jwt", localStorage.getItem("jwt"));
    const { data } = await api.post(`/api/orders`, reqData.address);
    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error :", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("order by id:", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error :", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllOrders = (user) => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDER_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/user/${user}`);
    console.log("orders:", data);
    dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error :", error);
    dispatch({
      type: GET_ALL_ORDER_FAILURE,
      payload: error.message,
    });
  }
};
