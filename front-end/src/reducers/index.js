import { combineReducers } from 'redux';
import { getAllUsersReducer, disableUserReducer, checkUserDisabilityReducer } from './userReducers';
import { headerTitleReducer } from './headerReducers';
import { createAssetReducer } from './createAssetReducer';
import { createCategoryReducer } from './createCategoryReducer';
import { authReducer, changePasswordReducer } from './authReducers';
import { createUserReducer, storeUserReducer } from './createUserReducer';
import { getUserReducer } from './getUserReducer';
import { editUserReducer } from './editUserReducer';
import { updateAssetReducer } from './updateAssetReducer';
import { getAssetForEditAssignmentReducer, getAssetReducer } from './getAssetReducer';
import {
  deleteAssetReducer,
  findAssetsReducer,
  getAssetsAssignmentHistoryReducer,
  storeAssetReducer,
} from './assetReducers';
import { getAllCategoriesReducer } from './categoriesReducers';
import {
  createAssignmentReducer,
  getAssignmentReducer,
  updateAssignmentReducer,
  findAssignmentReducer,
  storeAssignmentReducer,
  deleteAssignmentReducer,
  findOwnAssignmentReducer,
  changeStatusAssignmentReducer,
  createRequestForReturningAssetReducer,
  completeReturningRequestReducer,
  cancelReturningRequestReducer,
} from './assignmentReducers';
import { getReportReducer } from './getReportReducer';

const rootReducer = combineReducers({
  getAllUsersReducer,
  headerTitleReducer,
  createAssetReducer,
  createCategoryReducer,
  authReducer,
  createUserReducer,
  updateAssetReducer,
  getAssetReducer,
  storeUserReducer,
  getUserReducer,
  editUserReducer,
  changePasswordReducer,
  findAssetsReducer,
  storeAssetReducer,
  getAllCategoriesReducer,
  createAssignmentReducer,
  getAssignmentReducer,
  updateAssignmentReducer,
  findAssignmentReducer,
  storeAssignmentReducer,
  deleteAssetReducer,
  deleteAssignmentReducer,
  findOwnAssignmentReducer,
  changeStatusAssignmentReducer,
  disableUserReducer,
  checkUserDisabilityReducer,
  getAssetForEditAssignmentReducer,
  getAssetsAssignmentHistoryReducer,
  createRequestForReturningAssetReducer,
  completeReturningRequestReducer,
  cancelReturningRequestReducer,
  getReportReducer,
});

export default rootReducer;
