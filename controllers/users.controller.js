const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const { Op, Sequelize } = require('sequelize');
const { generateJWTToken } = require('../utils/generateJWTToken');
const { createUsername, getPagination, getSort, getPagingData } = require('../utils/user.util');
const { enumUserTypes } = require('../utils/enums.util');
const { getAssignmentInProgressByUserId } = require('../services/assignments.service');
const {
  createUser,
  countUser,
  userLogin,
  editUser,
  getUser,
  changePassword,
  getUserByID,
  disableUser,
} = require('../services/users.service');
const { Users } = require('../models');
const { validateUserChangePassword } = require('../validations/user.validation');

const userLoginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const existedUser = await userLogin({ username, password });

  if (!existedUser) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'Username or password is incorrect. Please try again')
    );
  }

  // Remove sensitive fields
  existedUser.password = undefined;

  const token = generateJWTToken(existedUser);

  return res.status(200).json({
    token,
    user: existedUser,
    firstTimeLogin: existedUser.firstTimeLogin,
  });
};

const createUserHandler = async (req, res, next) => {
  const user = req.body;
  const { firstName, lastName } = req.body;
  const location = req.user.userLocation;
  const count = await countUser();
  if (count >= 9999) {
    return next(
      createError(StatusCodes.FAILED_DEPENDENCY, 'The number of users has exceeded 9999!')
    );
  }
  const username = await createUsername(firstName, lastName);
  const userCreated = await createUser(user, username, location);
  return res.status(StatusCodes.CREATED).json(userCreated);
};

const generateAssetsFilterObject = (searchText, type) => {
  let whereCondition = {};

  if (searchText) {
    whereCondition = {
      [Op.or]: [
        { staffCode: { [Op.iLike]: `%${searchText}%` } },
        Sequelize.where(
          Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')),
          {
            [Op.iLike]: `%${searchText}%`,
          }
        ),
      ],
    };
  }

  if (type && type.length > 0 && !type.includes(enumUserTypes.ALL)) {
    whereCondition = { ...whereCondition, userType: { [Op.eq]: type } };
  }
  return whereCondition;
};

const getListUser = async (req, res) => {
  const location = req.user.userLocation;
  const currentUserID = req.user.id;
  const { page, size, searchText, type, sortBy, variation } = req.query;
  const whereCondition = {
    ...generateAssetsFilterObject(searchText, type),
    disabled: false,
    userLocation: location,
  };
  const { column, sortCol } = getSort(sortBy, variation);
  const { limit, offset } = getPagination(page, size);
  const data = await Users.findAndCountAll({
    where: { ...whereCondition, id: { [Op.ne]: currentUserID } },
    limit,
    offset,
    order: [[`${column}`, `${sortCol}`]],
  });
  const response = getPagingData(data, page, limit);
  return res.status(200).json(response);
};

const editUserHandler = async (req, res, next) => {
  const { id } = req.body;
  let user = await getUser(id);
  if (user.id === req.user.id) {
    return next(createError(StatusCodes.BAD_REQUEST, 'You cant edit your profile'));
  }
  if (!user || user.disabled) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }
  user = await editUser(req.body);
  return res.status(StatusCodes.OK).json(user);
};

const getUserHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (!user || user.disabled) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }
  return res.status(StatusCodes.OK).json(user);
};

const userChangePasswordHandler = async (req, res, next) => {
  const userID = req.user.id;
  const { password, newPassword } = req.body;
  const existedUser = await getUserByID(userID);

  if (!existedUser) {
    return next(createError(StatusCodes.BAD_REQUEST, 'User with this ID does not exist'));
  }

  const { firstTimeLogin } = existedUser;
  const userChangePasswordErrorObject = validateUserChangePassword(req.body, existedUser);

  if (userChangePasswordErrorObject) {
    return next(userChangePasswordErrorObject);
  }

  let user;

  if (firstTimeLogin) {
    user = await changePassword(userID, password);
  } else {
    user = await changePassword(userID, newPassword);
  }

  return res.status(200).json({ id: user.id });
};

const checkDeleteUserHandler = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await getAssignmentInProgressByUserId(id);
  const user = await getUser(id);
  if (!user || user.disabled) {
    return next(createError(StatusCodes.NOT_FOUND, 'The user with this ID does not exist'));
  }
  if (assignment.length < 1) {
    return res.status(StatusCodes.OK).json({ success: true });
  }
  return res.status(StatusCodes.OK).json({ success: false });
};

const disableUserHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (!user || user.disabled) {
    return next(createError(StatusCodes.NOT_FOUND, 'The user with this ID does not exist'));
  }
  return res.status(StatusCodes.OK).json(await disableUser(id));
};

module.exports = {
  userLoginHandler,
  createUserHandler,
  getListUser,
  getUserHandler,
  editUserHandler,
  userChangePasswordHandler,
  checkDeleteUserHandler,
  disableUserHandler,
};
