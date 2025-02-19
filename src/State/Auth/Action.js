/* eslint-disable no-unused-vars */
import axios from "axios";
import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// Actions for registering
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });
export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user", user);
    dispatch(registerSuccess(user.jwt));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Actions for standard login
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    if (user.refreshToken) {
      localStorage.setItem("refreshToken", user.refreshToken);
    }
    console.log("user", user.refreshToken);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const googleLogin = () => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Step 1: Redirect user to Google OAuth URL
    window.location.href = `${API_BASE_URL}/api/users/auth/google`;
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Actions for fetching user profile
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true, // Allow cookies to be sent
    });
    const user = response.data;
    console.log("user", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

// Google logout
export const googleLogout = () => async (dispatch) => {
  try {
    await axios.get(`${API_BASE_URL}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

// Exported actions
export const getUserById = (userId) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await api.get(`/api/users/${userId}`);
    const user = response.data;
    console.log("user", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};
