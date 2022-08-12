import {
  USERS_CHANGE_PASSWORD_FAIL,
  USERS_CHANGE_PASSWORD_REQUEST,
  USERS_CHANGE_PASSWORD_SUCCESS,
  USERS_GET_CURRENT_USER_DATA,
  USERS_LOGIN_FAIL,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  USERS_LOGOUT,
} from '../constants';

export const authReducer = (
  state = {
    loading: false,
    userData: localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USERS_GET_CURRENT_USER_DATA:
      return {
        ...state,
        userData: localStorage.getItem('userData')
          ? JSON.parse(localStorage.getItem('userData'))
          : null,
        error: null,
      };
    case USERS_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USERS_LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload, error: null };
    case USERS_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USERS_LOGOUT:
      return {
        ...state,
        loading: false,
        userData: null,
        error: null,
      };
    default:
      return state;
  }
};

export const changePasswordReducer = (
  state = {
    loading: false,
    user: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USERS_CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case USERS_CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case USERS_CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
