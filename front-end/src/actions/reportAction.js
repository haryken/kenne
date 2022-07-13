import axios from 'axios';
import queryString from 'querystring';
import { GET_REPORT_REQUEST, GET_REPORT_SUCCESS, GET_REPORT_FAIL } from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const REPORT_URL = `${process.env.REACT_APP_API_URL}/reports`;

export const getReport = (body) => async (dispatch, getState) => {
  dispatch({
    type: GET_REPORT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const paramsTxt = queryString.stringify(body);
    const res = await axios.get(`${REPORT_URL}?${paramsTxt}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_REPORT_SUCCESS,
      payload: res.data.rows,
    });
  } catch (err) {
    dispatch({
      type: GET_REPORT_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};
