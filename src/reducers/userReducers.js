import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  USERS_CHECK_ABLE_TO_DISABLE_SUCCESS,
  USERS_CHECK_ABLE_TO_DISABLE_REQUEST,
  USERS_CHECK_ABLE_TO_DISABLE_FAIL,
  DISABLE_USER_FAIL,
  DISABLE_USER_REQUEST,
  DISABLE_USER_SUCCESS,
} from '../constants';

export const getAllUsersReducer = (
  state = {
    loading: false,
    users: [],
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.dataRows,
        error: null,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const checkUserDisabilityReducer = (
  state = {
    loading: false,
    success: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USERS_CHECK_ABLE_TO_DISABLE_REQUEST:
      return { ...state, loading: true };
    case USERS_CHECK_ABLE_TO_DISABLE_SUCCESS:
      return { ...state, loading: false, success: action.payload.success, error: null };
    case USERS_CHECK_ABLE_TO_DISABLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const disableUserReducer = (
  state = {
    loading: false,
    user: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case DISABLE_USER_REQUEST:
      return { ...state, loading: true };
    case DISABLE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case DISABLE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
