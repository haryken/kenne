import axios from 'axios';
import moment from 'moment';
import queryString from 'querystring';
import {
  CREATE_ASSIGNMENT_REQUEST,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_FAIL,
  UPDATE_ASSIGNMENT_REQUEST,
  UPDATE_ASSIGNMENT_SUCCESS,
  UPDATE_ASSIGNMENT_FAIL,
  GET_ASSIGNMENT_REQUEST,
  GET_ASSIGNMENT_SUCCESS,
  GET_ASSIGNMENT_FAIL,
  FIND_ASSIGNMENT_REQUEST,
  FIND_ASSIGNMENT_SUCCESS,
  FIND_ASSIGNMENT_FAIL,
  REMOVE_STORE_ASSIGNMENT,
  STORE_ASSIGNMENT,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FAIL,
  FIND_OWN_ASSIGNMENT_REQUEST,
  FIND_OWN_ASSIGNMENT_SUCCESS,
  FIND_OWN_ASSIGNMENT_FAIL,
  CHANGE_STATUS_ASSIGNMENT_REQUEST,
  CHANGE_STATUS_ASSIGNMENT_SUCCESS,
  CHANGE_STATUS_ASSIGNMENT_FAIL,
  CREATE_REQUEST_FOR_RETURNING_ASSET_REQUEST,
  CREATE_REQUEST_FOR_RETURNING_ASSET_SUCCESS,
  CREATE_REQUEST_FOR_RETURNING_ASSET_FAIL,
  COMPLETE_RETURNING_REQUEST_REQUEST,
  COMPLETE_RETURNING_REQUEST_SUCCESS,
  COMPLETE_RETURNING_REQUEST_FAIL,
  CANCEL_RETURNING_REQUEST_REQUEST,
  CANCEL_RETURNING_REQUEST_SUCCESS,
  CANCEL_RETURNING_REQUEST_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const ASSIGNMENT_URL = `${process.env.REACT_APP_API_URL}/assignments`;

export const createAssignment =
  ({ assignedTo, assignedAsset, assignedDate, note }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CREATE_ASSIGNMENT_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();

    try {
      const res = await axios.post(
        `${ASSIGNMENT_URL}`,
        {
          assignedTo,
          assignedAsset,
          assignedDate: moment(assignedDate).format('YYYY-MM-DD'),
          note,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: CREATE_ASSIGNMENT_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_ASSIGNMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ASSIGNMENT_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const updateAssignment =
  ({ id, assignedTo, assignedAsset, assignedDate, note }) =>
  async (dispatch, getState) => {
    dispatch({
      type: UPDATE_ASSIGNMENT_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.put(
        `${ASSIGNMENT_URL}`,
        {
          id,
          assignedTo,
          assignedAsset,
          assignedDate: moment(assignedDate).format('YYYY-MM-DD'),
          note,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: UPDATE_ASSIGNMENT_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_ASSIGNMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ASSIGNMENT_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const getAssignment = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_ASSIGNMENT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`${ASSIGNMENT_URL}/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ASSIGNMENT_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const findAssignment = (body) => async (dispatch, getState) => {
  dispatch({
    type: FIND_ASSIGNMENT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const paramsTxt = queryString.stringify(body);
    const res = await axios.get(`${ASSIGNMENT_URL}/find?${paramsTxt}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: FIND_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FIND_ASSIGNMENT_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};

export const removeStoreAssignment = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_ASSIGNMENT,
  });
};

export const deleteAssignment = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_ASSIGNMENT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.delete(`${ASSIGNMENT_URL}/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: DELETE_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ASSIGNMENT_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const findOwnAssignment = (body) => async (dispatch, getState) => {
  dispatch({
    type: FIND_OWN_ASSIGNMENT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const paramsTxt = queryString.stringify(body);
    const res = await axios.get(`${ASSIGNMENT_URL}/mine?${paramsTxt}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: FIND_OWN_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FIND_OWN_ASSIGNMENT_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};

export const changeStatusAssignment = (id, status) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_STATUS_ASSIGNMENT_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.patch(
      `${ASSIGNMENT_URL}/changeStatus/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: CHANGE_STATUS_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHANGE_STATUS_ASSIGNMENT_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};

export const createRequestForReturningAsset = (id) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_REQUEST_FOR_RETURNING_ASSET_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.post(
      `${ASSIGNMENT_URL}/${id}/request-for-returning`,
      {},
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: CREATE_REQUEST_FOR_RETURNING_ASSET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_REQUEST_FOR_RETURNING_ASSET_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};

export const completeReturningRequest = (id) => async (dispatch, getState) => {
  dispatch({
    type: COMPLETE_RETURNING_REQUEST_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.post(
      `${ASSIGNMENT_URL}/${id}/complete-returning-request`,
      {},
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: COMPLETE_RETURNING_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPLETE_RETURNING_REQUEST_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};

export const cancelReturningRequest = (id) => async (dispatch, getState) => {
  dispatch({
    type: CANCEL_RETURNING_REQUEST_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.post(
      `${ASSIGNMENT_URL}/${id}/cancel-returning-request`,
      {},
      {
        headers: {
          Authorization: createAuthorizedRequestHeader(userData),
        },
      }
    );
    dispatch({
      type: CANCEL_RETURNING_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CANCEL_RETURNING_REQUEST_FAIL,
      payload: getErrorMessageFromResponse(err),
    });
  }
};
