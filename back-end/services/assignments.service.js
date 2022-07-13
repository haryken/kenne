const moment = require('moment');
const { Op } = require('sequelize');
const { Asset, Assignments, Users } = require('../models');
const { updateAssetState } = require('./assets.service');
const { enumAssetState, enumAssignmentState } = require('../utils/enums.util');

const getAllAssignment = async () =>
  Assignments.findAll({
    include: [
      Asset,
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
    ],
  });

const getMyAssignments = async (dataObject) => {
  const { id, page, size, orderByClause } = dataObject;
  const current = moment(new Date().setHours(0, 0, 0, 0)).format('YYYY-MM-DD');
  return Assignments.findAndCountAll({
    where: {
      assignedDate: {
        [Op.lte]: current,
      },
      assignedTo: id,
      assignmentState: {
        [Op.in]: [
          enumAssignmentState.ACCEPTED,
          enumAssignmentState.WAITING_FOR_ACCEPTANCE,
          enumAssignmentState.WAITING_FOR_RETURNING,
          enumAssignmentState.WAITING_FOR_RETURNING,
        ],
      },
    },
    order: orderByClause,
    offset: (page - 1) * size,
    limit: size,
    include: [
      { model: Asset, as: 'Asset' },
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
    ],
  });
};

const createAssignment = async (newAssignment, assignedBy) => {
  const { assignedDate, note, assignedTo, assignedAsset } = newAssignment;
  const assignment = await Assignments.create({
    assignedDate: moment(assignedDate).format('YYYY-MM-DD'),
    note,
    assignedTo,
    assignedBy,
    assignedAsset,
  });
  await updateAssetState(assignedAsset, enumAssetState.ASSIGNED);
  return assignment;
};

const getAssignment = async (id) =>
  Assignments.findByPk(id, {
    include: [
      { model: Asset, as: 'Asset' },
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
      { model: Users, as: 'Requested_By', attributes: ['username'] },
      { model: Users, as: 'Accepted_By', attributes: ['username'] },
    ],
  });

const findAssignments = async (searchObject) => {
  const { page, size, whereClause, orderByClause } = searchObject;

  return Assignments.findAndCountAll({
    where: whereClause,
    order: orderByClause,
    include: [
      { model: Asset, as: 'Asset' },
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
      { model: Users, as: 'Requested_By', attributes: ['username'] },
      { model: Users, as: 'Accepted_By', attributes: ['username'] },
    ],
    offset: (page - 1) * size,
    limit: size,
  });
};

const editAssignment = async (newAssignment) => {
  const { id, assignedDate, note, assignedTo, assignedAsset } = newAssignment;
  const assignment = await getAssignment(id);
  if (assignment.assignedAsset !== assignedAsset) {
    await updateAssetState(assignment.assignedAsset, enumAssetState.AVAILABLE);
    await updateAssetState(assignedAsset, enumAssetState.ASSIGNED);
    assignment.assignedAsset = assignedAsset;
  }
  assignment.assignedDate = moment(assignedDate).format('YYYY-MM-DD');
  assignment.note = note;
  assignment.assignedTo = assignedTo;
  await assignment.save();
  return getAssignment(id);
};

const getAssignmentInProgressByUserId = (id) =>
  Assignments.findAll({
    where: {
      [Op.or]: [
        {
          assignedTo: id,
        },
        {
          assignedBy: id,
        },
      ],
      assignmentState: {
        [Op.ne]: enumAssignmentState.COMPLETED,
      },
    },
  });

const getAssignmentAssignedAsset = (id) =>
  Assignments.findAll({
    where: {
      assignedAsset: id,
    },
  });

const getAssignmentById = async (id) =>
  Assignments.findByPk(id, {
    include: [
      Asset,
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
    ],
  });

const deleteAssignment = async (id) => {
  const assignment = await getAssignmentById(id);
  if (assignment.assignmentState === enumAssignmentState.WAITING_FOR_ACCEPTANCE) {
    await updateAssetState(assignment.assignedAsset, enumAssetState.AVAILABLE);
  }
  return Assignments.destroy({
    where: {
      id,
    },
  });
};

const getAssignmentsByAssignedAsset = async (assetID) =>
  Assignments.findAll({
    where: {
      assignedAsset: parseInt(assetID, 10),
      assignmentState: {
        [Op.ne]: enumAssignmentState.DECLINED,
      },
    },
    order: [['createdAt', 'DESC']],
    include: [
      { model: Users, as: 'Assigned_To', attributes: ['username'] },
      { model: Users, as: 'Assigned_By', attributes: ['username'] },
    ],
    limit: 5,
  });

const completeReturningRequest = async (id, acceptedBy) => {
  const assignment = await getAssignmentById(id);
  assignment.assignmentState = enumAssignmentState.COMPLETED;
  assignment.acceptedBy = acceptedBy;
  assignment.returnedDate = moment(new Date().setHours(0, 0, 0, 0)).format('YYYY-MM-DD');
  await updateAssetState(assignment.assignedAsset, enumAssetState.AVAILABLE);
  return assignment.save();
};

const cancelReturningRequest = async (id) => {
  const assignment = await getAssignmentById(id);
  assignment.assignmentState = enumAssignmentState.ACCEPTED;
  assignment.requestedBy = null;
  return assignment.save();
};

module.exports = {
  getAllAssignment,
  findAssignments,
  createAssignment,
  getAssignment,
  editAssignment,
  getAssignmentInProgressByUserId,
  getAssignmentAssignedAsset,
  deleteAssignment,
  getMyAssignments,
  getAssignmentById,
  getAssignmentsByAssignedAsset,
  completeReturningRequest,
  cancelReturningRequest,
};
