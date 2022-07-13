const enumUserTypes = {
  ADMIN: 'Admin',
  STAFF: 'Staff',
  ALL: 'All',
};
const enumUserGenders = {
  MALE: 'Male',
  FEMALE: 'Female',
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
  WAITING_FOR_ACCEPTANCE: 'WAITING_FOR_ACCEPTANCE',
  ACCEPTED: 'ACCEPTED',
  WAITING_FOR_RETURNING: 'WAITING_FOR_RETURNING',
  COMPLETED: 'COMPLETED',
  DECLINED: 'DECLINED',
};

Object.freeze(enumUserTypes);
Object.freeze(enumUserGenders);
Object.freeze(enumAssetState);
Object.freeze(enumAssignmentState);

const userType = () => [enumUserTypes.ADMIN, enumUserTypes.STAFF];
const gender = () => [enumUserGenders.MALE, enumUserGenders.FEMALE];

module.exports = {
  userType,
  gender,
  enumUserTypes,
  enumUserGenders,
  enumAssetState,
  enumAssignmentState,
};
