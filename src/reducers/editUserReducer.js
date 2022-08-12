import { EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAIL } from '../constants';

export const editUserReducer = (
  state = {
    editingLoading: false,
    user: null,
    editingError: null,
  },
  action
) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return { ...state, editingLoading: true };
    case EDIT_USER_SUCCESS:
      return { ...state, editingLoading: false, user: action.payload, editingError: null };
    case EDIT_USER_FAIL:
      return { ...state, editingLoading: false, editingError: action.payload };
    default:
      return state;
  }
};
