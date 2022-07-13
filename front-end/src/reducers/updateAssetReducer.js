import { UPDATE_ASSET_REQUEST, UPDATE_ASSET_SUCCESS, UPDATE_ASSET_FAIL } from '../constants';

export const updateAssetReducer = (
  state = {
    editLoading: false,
    assets: [],
    editError: null,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_ASSET_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ASSET_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case UPDATE_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
