import { CREATE_ASSET_REQUEST, CREATE_ASSET_SUCCESS, CREATE_ASSET_FAIL } from '../constants';

export const createAssetReducer = (
  state = {
    loading: false,
    assets: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_ASSET_REQUEST:
      return { ...state, loading: true };
    case CREATE_ASSET_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case CREATE_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
