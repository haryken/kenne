import { GET_REPORT_REQUEST, GET_REPORT_SUCCESS, GET_REPORT_FAIL } from '../constants';

export const getReportReducer = (
  state = {
    loading: false,
    data: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return { ...state, loading: true };
    case GET_REPORT_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case GET_REPORT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
