import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  // If reqData is undefined, make a call to /api/products without any filters
  if (!reqData) {
    try {
      const { data } = await api.get(`/api/products`);
      console.log("product data (no filters)", data);
      dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
    return; // Exit the function early
  }

  // Destructure reqData and set default for maxPrice if 0 or undefined
  const {
    colors,
    sizes,
    minPrice,
    maxPrice = 1000000000, // Only use 1000000000 if maxPrice is 0 or undefined
    category,
    minDiscount,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  // Apply the large default only if maxPrice is 0 or undefined
  const finalMaxPrice =
    maxPrice === 0 || maxPrice === undefined ? 1000000000 : maxPrice;

  // Construct URL parameters
  const params = new URLSearchParams();
  if (colors) params.append("color", colors);
  if (sizes) params.append("size", sizes);
  if (minPrice) params.append("minPrice", minPrice);
  params.append("maxPrice", finalMaxPrice); // Add adjusted maxPrice
  if (category) params.append("category", category);
  if (minDiscount) params.append("minDiscount", minDiscount);
  if (stock) params.append("stock", stock);
  if (sort) params.append("sort", sort);
  if (pageNumber) params.append("pageNumber", pageNumber);
  if (pageSize) params.append("pageSize", pageSize);

  console.log("Final URL params:", params.toString());

  try {
    const { data } = await api.get(`/api/products?${params.toString()}`);
    console.log("product data ", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  console.log("product id:", productId);
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("data :", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product
    );
    console.log("create product data ----", data);
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await api.delete(
      `${API_BASE_URL}/api/admin/products/${productId}`
    );
    console.log("deleted Products ----", data);
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
};
