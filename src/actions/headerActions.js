import { SET_HEADER_TITLE } from '../constants';

export const setHeaderTitle = (headerTitle) => (dispatch) => {
  dispatch({
    type: SET_HEADER_TITLE,
    payload: {
      headerTitle,
    },
  });
};
