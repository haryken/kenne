import jwpaginate from 'jw-paginate';
import {
  CREATE_ASSIGNMENT_REQUEST,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_FAIL,
  GET_ASSIGNMENT_REQUEST,
  GET_ASSIGNMENT_SUCCESS,
  GET_ASSIGNMENT_FAIL,
  UPDATE_ASSIGNMENT_REQUEST,
  UPDATE_ASSIGNMENT_SUCCESS,
  UPDATE_ASSIGNMENT_FAIL,
  FIND_ASSIGNMENT_REQUEST,
  FIND_ASSIGNMENT_SUCCESS,
  FIND_ASSIGNMENT_FAIL,
  STORE_ASSIGNMENT,
  REMOVE_STORE_ASSIGNMENT,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FAIL,
  FIND_OWN_ASSIGNMENT_REQUEST,
  FIND_OWN_ASSIGNMENT_SUCCESS,
  FIND_OWN_ASSIGNMENT_FAIL,
  CHANGE_STATUS_ASSIGNMENT_REQUEST,
  CHANGE_STATUS_ASSIGNMENT_SUCCESS,
  CHANGE_STATUS_ASSIGNMENT_FAIL,
  CREATE_REQUEST_FOR_RETURNING_ASSET_REQUEST,
  CREATE_REQUEST_FOR_RETURNING_ASSET_SUCCESS,
  CREATE_REQUEST_FOR_RETURNING_ASSET_FAIL,
  COMPLETE_RETURNING_REQUEST_REQUEST,
  COMPLETE_RETURNING_REQUEST_SUCCESS,
  COMPLETE_RETURNING_REQUEST_FAIL,
  CANCEL_RETURNING_REQUEST_FAIL,
  CANCEL_RETURNING_REQUEST_REQUEST,
  CANCEL_RETURNING_REQUEST_SUCCESS,
} from '../constants';

export const createAssignmentReducer = (
  state = {
    loading: false,
    assignment: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_ASSIGNMENT_SUCCESS:
      return { ...state, loading: false, assignment: action.payload, error: null };
    case CREATE_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAssignmentReducer = (
  state = {
    loading: false,
    assignment: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case GET_ASSIGNMENT_SUCCESS:
      return { ...state, loading: false, assignment: action.payload, error: null };
    case GET_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateAssignmentReducer = (
  state = {
    editLoading: false,
    assignment: null,
    editError: null,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ASSIGNMENT_SUCCESS:
      return { ...state, loading: false, assignment: action.payload, error: null };
    case UPDATE_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const findAssignmentReducer = (
  state = {
    loading: true,
    assets: [],
    error: null,
    assetPageObject: null,
  },
  action
) => {
  switch (action.type) {
    case FIND_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case FIND_ASSIGNMENT_SUCCESS:
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
    case FIND_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeAssignmentReducer = (
  state = {
    assignment: null,
  },
  action
) => {
  switch (action.type) {
    case STORE_ASSIGNMENT:
      return { ...state, assignment: action.payload };
    case REMOVE_STORE_ASSIGNMENT:
      return { ...state, assignment: null };
    default:
      return state;
  }
};

export const deleteAssignmentReducer = (
  state = {
    loading: false,
    success: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case DELETE_ASSIGNMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_ASSIGNMENT_SUCCESS:
      return { ...state, loading: false, success: action.payload.success, error: null };
    case DELETE_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const findOwnAssignmentReducer = (
  state = {
    loading: true,
    assignments: [],
    error: null,
    assignmentPageObject: null,
  },
  action
) => {
  switch (action.type) {
    case FIND_OWN_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case FIND_OWN_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        assignments: action.payload.assignments,
        error: null,
        assignmentPageObject: jwpaginate(
          action.payload.totalItems,
          action.payload.currentPage,
          action.payload.pageSize,
          6
        ),
      };
    case FIND_OWN_ASSIGNMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeStatusAssignmentReducer = (
  state = {
    loadingChangeState: true,
    changeStatusSuccess: false,
    errorChangeState: null,
  },
  action
) => {
  switch (action.type) {
    case CHANGE_STATUS_ASSIGNMENT_REQUEST:
      return { ...state, loadingChangeState: true };
    case CHANGE_STATUS_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loadingChangeState: false,
        changeStatusSuccess: true,
        errorChangeState: null,
      };
    case CHANGE_STATUS_ASSIGNMENT_FAIL:
      return {
        loadingChangeState: false,
        errorChangeState: action.payload,
      };
    default:
      return state;
  }
};

export const createRequestForReturningAssetReducer = (
  state = {
    loadingRequestForReturningAsset: false,
    requestForReturningAssetSuccess: false,
    errorRequestForReturningAsset: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_REQUEST_FOR_RETURNING_ASSET_REQUEST:
      return { ...state, loadingRequestForReturningAsset: true };
    case CREATE_REQUEST_FOR_RETURNING_ASSET_SUCCESS:
      return {
        ...state,
        loadingRequestForReturningAsset: false,
        requestForReturningAssetSuccess: true,
        errorRequestForReturningAsset: null,
      };
    case CREATE_REQUEST_FOR_RETURNING_ASSET_FAIL:
      return {
        loadingRequestForReturningAsset: false,
        errorRequestForReturningAsset: action.payload,
      };
    default:
      return state;
  }
};

export const completeReturningRequestReducer = (
  state = {
    loadingCompleteReturningRequest: false,
    completeReturningRequestSuccess: false,
    errorCompleteReturningRequest: null,
  },
  action
) => {
  switch (action.type) {
    case COMPLETE_RETURNING_REQUEST_REQUEST:
      return {
        ...state,
        loadingCompleteReturningRequest: true,
      };
    case COMPLETE_RETURNING_REQUEST_SUCCESS:
      return {
        ...state,
        loadingCompleteReturningRequest: false,
        completeReturningRequestSuccess: true,
        errorCompleteReturningRequest: null,
      };
    case COMPLETE_RETURNING_REQUEST_FAIL:
      return {
        loadingCompleteReturningRequest: false,
        errorCompleteReturningRequest: action.payload,
      };
    default:
      return state;
  }
};

export const cancelReturningRequestReducer = (
  state = {
    loadingCancelReturningRequest: false,
    cancelReturningRequestSuccess: false,
    errorCancelReturningRequest: null,
  },
  action
) => {
  switch (action.type) {
    case CANCEL_RETURNING_REQUEST_REQUEST:
      return {
        ...state,
        loadingCancelReturningRequest: true,
      };
    case CANCEL_RETURNING_REQUEST_SUCCESS:
      return {
        ...state,
        loadingCancelReturningRequest: false,
        cancelReturningRequestSuccess: true,
        errorCancelReturningRequest: null,
      };
    case CANCEL_RETURNING_REQUEST_FAIL:
      return {
        loadingCancelReturningRequest: false,
        errorCancelReturningRequest: action.payload,
      };
    default:
      return state;
  }
};
