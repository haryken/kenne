import axios from 'axios';
import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
} from '../constants';
import { getErrorMessageFromResponse } from '../utils';

const CATEGORY_URL = `${process.env.REACT_APP_API_URL}/categories`;

export const createCategory =
  ({ categoryName, slug }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });
    try {
      const res = await axios.post(`${CATEGORY_URL}`, {
        name: categoryName,
        slug,
      });
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const getAllCategories = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_CATEGORIES_REQUEST,
  });
  try {
    const res = await axios.get(CATEGORY_URL);
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};
