import jwpaginate from 'jw-paginate';
import {
  CLEAR_DELETE_ASSET_ERROR,
  DELETE_ASSET_FAIL,
  DELETE_ASSET_REQUEST,
  DELETE_ASSET_SUCCESS,
  FIND_ASSETS_FAIL,
  FIND_ASSETS_REQUEST,
  FIND_ASSETS_SUCCESS,
  GET_ASSETS_ASSIGNMENT_HISTORY_FAIL,
  GET_ASSETS_ASSIGNMENT_HISTORY_REQUEST,
  GET_ASSETS_ASSIGNMENT_HISTORY_SUCCESS,
  REMOVE_STORE_ASSET,
  STORE_ASSET,
} from '../constants';

export const findAssetsReducer = (
  state = {
    loading: false,
    assets: [],
    error: null,
    assetPageObject: null,
  },
  action
) => {
  switch (action.type) {
    case FIND_ASSETS_REQUEST:
      return { ...state, loading: true };
    case FIND_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        assets: action.payload.assets,
        error: null,
        assetPageObject: jwpaginate(
          action.payload.totalItems,
          action.payload.currentPage,
          action.payload.pageSize,
          6
        ),
      };
    case FIND_ASSETS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeAssetReducer = (
  state = {
    asset: null,
  },
  action
) => {
  switch (action.type) {
    case STORE_ASSET:
      return { ...state, asset: action.payload };
    case REMOVE_STORE_ASSET:
      return { ...state, asset: null };
    default:
      return state;
  }
};

export const deleteAssetReducer = (
  state = {
    loading: false,
    asset: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case CLEAR_DELETE_ASSET_ERROR:
      return { ...state, loading: false, asset: null, error: null };
    case DELETE_ASSET_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_ASSET_SUCCESS:
      return { ...state, loading: false, asset: action.payload, error: null };
    case DELETE_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAssetsAssignmentHistoryReducer = (
  state = {
    loading: true,
    assignments: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ASSETS_ASSIGNMENT_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ASSETS_ASSIGNMENT_HISTORY_SUCCESS:
      return { ...state, loading: false, assignments: action.payload, error: null };
    case GET_ASSETS_ASSIGNMENT_HISTORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
