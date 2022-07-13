import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
} from '../constants';

export const createCategoryReducer = (
  state = {
    addSuccess: false,
    errorAddCategory: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { ...state, addSuccess: false, errorAddCategory: null };
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, addSuccess: true, errorAddCategory: null };
    case CREATE_CATEGORY_FAIL:
      return { ...state, addSuccess: false, errorAddCategory: action.payload };
    default:
      return state;
  }
};
