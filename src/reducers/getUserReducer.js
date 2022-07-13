import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL } from '../constants';

export const getUserReducer = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
