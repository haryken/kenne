const { StatusCodes } = require('http-status-codes');
const { Op, Sequelize } = require('sequelize');
const createError = require('http-errors');
const {
  createAssignment,
  editAssignment,
  getAssignment,
  getAllAssignment,
  getMyAssignments,
  findAssignments,
  deleteAssignment,
  getAssignmentById,
  getAssignmentsByAssignedAsset,
  completeReturningRequest,
  cancelReturningRequest,
} = require('../services/assignments.service');
const { getAssetById, updateAssetState } = require('../services/assets.service');
const { getUser } = require('../services/users.service');
const { enumAssetState, enumAssignmentState } = require('../utils/enums.util');
const { Asset, Users } = require('../models');

const getAllHandler = async (req, res) => {
  const assignments = await getAllAssignment();

  return res.status(StatusCodes.OK).json(assignments);
};

const generateAssetsFilterObject = (
  search,
  assignedDateSearch,
  stateSearch,
  location,
  returnedDateSearch,
  requestForReturning
) => {
  let whereClause = {};

  let state = stateSearch;
  if (search) {
    if (requestForReturning) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { '$Requested_By.username$': { [Op.iLike]: `%${search}%` } },
          { '$Asset.assetCode$': { [Op.iLike]: `%${search}%` } },
          { '$Asset.assetName$': { [Op.iLike]: `%${search}%` } },
        ],
      };
    } else {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { '$Assigned_To.username$': { [Op.iLike]: `%${search}%` } },
          { '$Asset.assetCode$': { [Op.iLike]: `%${search}%` } },
          { '$Asset.assetName$': { [Op.iLike]: `%${search}%` } },
        ],
      };
    }
  }
  if (assignedDateSearch) {
    whereClause = { ...whereClause, assignedDate: assignedDateSearch };
  }

  if (state && state.length > 0 && !state.includes('All')) {
    state = state.split(',');

    whereClause = { ...whereClause, assignmentState: { [Op.in]: state } };
  }

  if (location) {
    whereClause = {
      ...whereClause,
      '$Asset.assetLocation$': location,
    };
  }

  if (returnedDateSearch) {
    whereClause = { ...whereClause, returnedDate: returnedDateSearch };
  }

  return whereClause;
};

const generateAssignmentsSortObject = (sortBy, order) => {
  const orderByClause = [];

  if (sortBy) {
    switch (sortBy) {
      case 'id':
        orderByClause.push(['id', order]);
        break;
      case 'assetCode':
        orderByClause.push([{ model: Asset }, 'assetCode', order]);
        break;
      case 'assetName':
        orderByClause.push([{ model: Asset }, 'assetName', order]);
        break;
      case 'assignedTo':
        orderByClause.push([{ model: Users, as: 'Assigned_To' }, 'username', order]);
        break;
      case 'assignedBy':
        orderByClause.push([{ model: Users, as: 'Assigned_By' }, 'username', order]);
        break;
      case 'requestedBy':
        orderByClause.push([{ model: Users, as: 'Requested_By' }, 'username', order]);
        break;
      case 'acceptedBy':
        orderByClause.push([{ model: Users, as: 'Accepted_By' }, 'username', order]);
        break;
      case 'assignedDate':
        orderByClause.push(['assignedDate', order]);
        break;
      case 'returnedDate':
        orderByClause.push(['returnedDate', order]);
        break;
      case 'state':
        orderByClause.push([
          Sequelize.literal(`(CASE "assignmentState" 
          WHEN '${enumAssignmentState.ACCEPTED}' THEN 1
          WHEN '${enumAssignmentState.COMPLETED}' THEN 2
          WHEN '${enumAssignmentState.DECLINED}' THEN 3
          WHEN '${enumAssignmentState.WAITING_FOR_ACCEPTANCE}' THEN 4
          WHEN '${enumAssignmentState.WAITING_FOR_RETURNING}' THEN 5 
          END)`),
          order,
        ]);
        break;
      default:
        orderByClause.push([{ model: Asset }, 'assetName', order]);
        break;
    }
  }

  return orderByClause;
};

const getMyAssignmentsHandler = async (req, res) => {
  const { sortBy } = req.query;
  const page = req.query.page || 1;
  const size = req.query.size || 10;
  const { id } = req.user;
  let { order } = req.query;

  if (!order) {
    order = 'ASC';
  }

  const orderByClause = generateAssignmentsSortObject(sortBy, order);
  const assignmentsRes = await getMyAssignments({ id, page, size, orderByClause });

  res.status(StatusCodes.OK).json({
    assignments: assignmentsRes.rows,
    totalItems: assignmentsRes.count,
    currentPage: parseInt(page, 10),
    pageSize: parseInt(size, 10),
  });
};

const findAssignmentsHandler = async (req, res) => {
  const { search, sortBy, state, assignedDate, returnedDate, requestForReturning } = req.query;
  const page = req.query.page || 1;
  const size = req.query.size || 10;
  const { userLocation } = req.user;

  let { order } = req.query;

  if (!order) {
    order = 'ASC';
  }

  const whereClause = generateAssetsFilterObject(
    search,
    assignedDate,
    state,
    userLocation,
    returnedDate,
    requestForReturning
  );
  const orderByClause = generateAssignmentsSortObject(sortBy, order);

  const assignmentsRes = await findAssignments({
    page,
    size,
    whereClause,
    orderByClause,
  });

  res.status(StatusCodes.OK).json({
    assets: assignmentsRes.rows,
    totalItems: assignmentsRes.count,
    currentPage: parseInt(page, 10),
    pageSize: parseInt(size, 10),
  });
};

const createAssignmentHandler = async (req, res, next) => {
  const asset = await getAssetById(req.body.assignedAsset);
  const user = await getUser(req.body.assignedTo);
  if (!user) {
    return next(createError(StatusCodes.BAD_REQUEST, 'The user with this ID does not exist'));
  }
  if (!asset) {
    return next(createError(StatusCodes.BAD_REQUEST, 'The asset with this ID does not exist'));
  }
  if (asset.state !== enumAssetState.AVAILABLE) {
    return next(createError(StatusCodes.BAD_REQUEST, 'You cannot assign this asset'));
  }
  const assignment = req.body;
  const assignmentCreated = await createAssignment(assignment, req.user.id);
  return res.status(StatusCodes.CREATED).json(await getAssignment(assignmentCreated.id));
};

const editAssignmentHandler = async (req, res, next) => {
  const assignment = await getAssignment(req.body.id);
  if (!assignment) {
    return next(createError(StatusCodes.BAD_REQUEST, 'The assignment with this ID does not exist'));
  }
  if (assignment.assignmentState !== enumAssignmentState.WAITING_FOR_ACCEPTANCE) {
    return next(createError(StatusCodes.NOT_FOUND, 'You cannot edit this assignment'));
  }
  if (assignment.assignedAsset !== req.body.assignedAsset) {
    const asset = await getAssetById(req.body.assignedAsset);
    if (!asset) {
      return next(createError(StatusCodes.BAD_REQUEST, 'The asset with this ID does not exist'));
    }
    if (asset.state !== enumAssetState.AVAILABLE) {
      return next(createError(StatusCodes.BAD_REQUEST, 'You cannot assign this asset'));
    }
  }
  if (assignment.assignedTo !== req.body.assignedTo) {
    const user = await getUser(req.body.assignedTo);
    if (!user) {
      return next(createError(StatusCodes.BAD_REQUEST, 'The user with this ID does not exist'));
    }
  }
  const assignmentEdited = await editAssignment(req.body);
  return res.status(StatusCodes.OK).json(await getAssignment(assignmentEdited.id));
};

const getAssignmentHandler = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await getAssignment(id);
  if (!assignment) {
    return next(createError(StatusCodes.BAD_REQUEST, 'The assignment with this ID does not exist'));
  }
  if (assignment.assignmentState !== enumAssignmentState.WAITING_FOR_ACCEPTANCE) {
    return next(createError(StatusCodes.BAD_REQUEST, 'You cannot get this assignment'));
  }
  return res.status(StatusCodes.OK).json(assignment);
};

const deleteAssignmentHandler = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await getAssignment(id);
  if (!assignment) {
    return next(createError(StatusCodes.NOT_FOUND, 'The assignment with this ID does not exist'));
  }
  if (
    assignment.assignmentState !== enumAssignmentState.WAITING_FOR_ACCEPTANCE &&
    assignment.assignmentState !== enumAssignmentState.DECLINED
  ) {
    return next(createError(StatusCodes.BAD_REQUEST, 'You cannot delete this assignment'));
  }
  return res.status(StatusCodes.OK).json({ success: (await deleteAssignment(id)) === 1, id });
};

const changeStatus = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await getAssignmentById(id);
  if (!assignment)
    return next(createError(StatusCodes.BAD_REQUEST, 'The assignment with this ID does not exist'));

  const { status } = req.body;
  if (!(status in enumAssignmentState))
    return next(createError(StatusCodes.BAD_REQUEST, 'Invalid status'));

  if (status === enumAssignmentState.DECLINED) {
    await updateAssetState(assignment.assignedAsset, enumAssetState.AVAILABLE);
  }

  // update status
  assignment.assignmentState = status;
  assignment.save();
  return res.status(StatusCodes.OK).json(assignment);
};

const getAssignmentsByAssignedAssetHandler = async (req, res, next) => {
  const { assetID } = req.params;
  const existedAsset = await getAssetById(assetID);

  if (!existedAsset) {
    return next(createError(StatusCodes.NOT_FOUND, 'The asset with this ID does not exist'));
  }

  return res.status(200).json(await getAssignmentsByAssignedAsset(assetID));
};

const createRequestForReturningHandler = async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;
  const assignment = await getAssignmentById(id);

  if (!assignment)
    return next(createError(StatusCodes.NOT_FOUND, 'The assignment with this ID does not exist'));

  if (assignment.assignmentState !== enumAssignmentState.ACCEPTED)
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `The assignment must have the state of ${enumAssignmentState.ACCEPTED}`
      )
    );

  assignment.assignmentState = enumAssignmentState.WAITING_FOR_RETURNING;
  assignment.requestedBy = userID;
  await assignment.save();

  return res.status(StatusCodes.OK).json(assignment);
};

const completeReturningRequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const acceptedBy = req.user.id;
  const assignment = await getAssignmentById(id);

  if (!assignment)
    return next(createError(StatusCodes.NOT_FOUND, 'The assignment with this ID does not exist'));

  if (assignment.assignmentState !== enumAssignmentState.WAITING_FOR_RETURNING)
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `The assignment must have the state of ${enumAssignmentState.WAITING_FOR_RETURNING}`
      )
    );
  return res.status(StatusCodes.OK).json(await completeReturningRequest(id, acceptedBy));
};

const cancelReturningRequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await getAssignmentById(id);

  if (!assignment)
    return next(createError(StatusCodes.NOT_FOUND, 'The assignment with this ID does not exist'));

  if (assignment.assignmentState !== enumAssignmentState.WAITING_FOR_RETURNING)
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `The assignment must have the state of ${enumAssignmentState.WAITING_FOR_RETURNING}`
      )
    );

  return res.status(StatusCodes.OK).json(await cancelReturningRequest(id));
};

module.exports = {
  createAssignmentHandler,
  editAssignmentHandler,
  getAssignmentHandler,
  getAllHandler,
  findAssignmentsHandler,
  deleteAssignmentHandler,
  getMyAssignmentsHandler,
  changeStatus,
  getAssignmentsByAssignedAssetHandler,
  createRequestForReturningHandler,
  generateAssetsFilterObject,
  generateAssignmentsSortObject,
  completeReturningRequestHandler,
  cancelReturningRequestHandler,
};
