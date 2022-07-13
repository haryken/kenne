const enumUserTypes = {
  ALL: 'All',
  ADMIN: 'Admin',
  STAFF: 'Staff',
};

const enumAssetState = {
  WAITING_FOR_RECYCLING: 'Waiting for recycling',
  RECYCLED: 'Recycled',
  NOT_AVAILABLE: 'Not Available',
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  ALL: 'All',
};

const enumAssignmentState = {
  ALL: 'All',
  ACCEPTED: 'ACCEPTED',
  WAITING_FOR_ACCEPTANCE: 'WAITING_FOR_ACCEPTANCE',
  WAITING_FOR_RETURNING: 'WAITING_FOR_RETURNING',
  COMPLETED: 'COMPLETED',
  DECLINED: 'DECLINED',
};

const enumAssignmentStateLowerCase = {
  ALL: 'All',
  ACCEPTED: 'Accepted',
  WAITING_FOR_ACCEPTANCE: 'Waiting for acceptance',
  WAITING_FOR_RETURNING: 'Waiting for returning',
  COMPLETED: 'Completed',
  DECLINED: 'Declined',
};

Object.freeze(enumUserTypes);
Object.freeze(enumAssetState);
Object.freeze(enumAssignmentState);
Object.freeze(enumAssignmentStateLowerCase);

const userTypes = Object.keys(enumUserTypes).map((key) => enumUserTypes[key]);
const assignmentStates = [
  enumAssignmentState.ALL,
  enumAssignmentState.ACCEPTED,
  enumAssignmentState.WAITING_FOR_ACCEPTANCE,
];

const requestForReturningStates = [
  enumAssignmentState.ALL,
  enumAssignmentState.COMPLETED,
  enumAssignmentState.WAITING_FOR_RETURNING,
];

export {
  enumUserTypes,
  userTypes,
  enumAssetState,
  enumAssignmentState,
  assignmentStates,
  enumAssignmentStateLowerCase,
  requestForReturningStates,
};
