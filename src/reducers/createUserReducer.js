import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  STORE_USER,
  REMOVE_STORE_USER,
} from '../constants';

export const createUserReducer = (
  state = {
    loading: false,
    users: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case CREATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeUserReducer = (
  state = {
    user: null,
  },
  action
) => {
  switch (action.type) {
    case STORE_USER:
      return { ...state, user: action.payload };
    case REMOVE_STORE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
