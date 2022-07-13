export * from './calculation';
export * from './generateHeaderTitle';
export * from './createAuthorizedRequestHeader';
export * from './createToast';
export * from './userList.util';
export * from './enum.util';
export * from './validation';
export * from './URLgenerator';

export const getErrorMessageFromResponse = (error) =>
  error.response && error.response.data.message ? error.response.data.message : error.message;

export const assetTableHeaders = [
  {
    name: 'Asset Code',
    sortBy: 'assetCode',
  },
  {
    name: 'Asset Name',
    sortBy: 'assetName',
  },
  {
    name: 'Category',
    sortBy: 'categoryName',
  },
  {
    name: 'State',
    sortBy: 'state',
  },
];

export const assignmentUserTableHeaders = [
  {
    name: 'Staff Code',
    sortBy: 'staffCode',
  },
  {
    name: 'Full Name',
    sortBy: 'firstName',
  },
  {
    name: 'Type',
    sortBy: 'userType',
  },
];

export const assignmentAssetTableHeaders = [
  {
    name: 'Asset Code',
    sortBy: 'assetCode',
  },
  {
    name: 'Asset Name',
    sortBy: 'assetName',
  },
  {
    name: 'Category',
    sortBy: 'categoryName',
  },
];

export const assignmentTableHeaderShorter = [
  {
    name: 'Asset Code',
    sortBy: 'assetCode',
  },
  {
    name: 'Asset Name',
    sortBy: 'assetName',
  },
  {
    name: 'Assigned To',
    sortBy: 'assignedTo',
  },
  {
    name: 'Assigned By',
    sortBy: 'assignedBy',
  },
  {
    name: 'Assigned Date',
    sortBy: 'assignedDate',
  },
  {
    name: 'State',
    sortBy: 'state',
  },
];

export const assignmentTableHeaders = [
  {
    name: 'No.',
    sortBy: 'id',
  },
  ...assignmentTableHeaderShorter,
];

export const requestForReturningTableHeaders = [
  {
    name: 'No.',
    sortBy: 'id',
  },
  {
    name: 'Asset Code',
    sortBy: 'assetCode',
  },
  {
    name: 'Asset Name',
    sortBy: 'assetName',
  },
  {
    name: 'Requested by',
    sortBy: 'requestedBy',
  },
  {
    name: 'Assigned Date',
    sortBy: 'assignedDate',
  },
  {
    name: 'Accepted by',
    sortBy: 'acceptedBy',
  },
  {
    name: 'Returned Date',
    sortBy: 'returnedDate',
  },
  {
    name: 'State',
    sortBy: 'state',
  },
];

export const reportTableHeader = [
  {
    name: 'Category',
    sortBy: 'category',
  },
  {
    name: 'Total',
    sortBy: 'total',
  },
  {
    name: 'Assigned',
    sortBy: 'assigned',
  },
  {
    name: 'Available',
    sortBy: 'available',
  },
  {
    name: 'Not Available',
    sortBy: 'notAvailable',
  },
  {
    name: 'Waiting for recycling',
    sortBy: 'waiting_for_recycling',
  },
  {
    name: 'Recycled',
    sortBy: 'recycled',
  },
];
