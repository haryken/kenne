const { verify } = require('jsonwebtoken');
const config = require('config');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const { enumUserTypes } = require('../utils/enums.util');

const validateToken = async (req, res, next) => {
  let accessToken = req.header('Authorization');
  if (!accessToken) return next(createError(StatusCodes.UNAUTHORIZED, "You haven't logged in yet"));
  let user;

  // eslint-disable-next-line prefer-destructuring
  accessToken = accessToken.split(' ')[1];

  try {
    const validToken = verify(accessToken, config.get('jwt_secret'));
    user = validToken.data;
    req.user = user;
    if (!req.roles || !req.roles.includes(user.userType)) {
      return next(
        createError(StatusCodes.FORBIDDEN, 'You need to have greater permission to view this')
      );
    }
    if (!user) {
      return next(createError(StatusCodes.NOT_FOUND, 'This user does not exist'));
    }
    return next();
  } catch (err) {
    return next(
      createError(StatusCodes.FORBIDDEN, 'You need to have greater permission to view this')
    );
  }
};

const validateAdminToken = async (req, res, next) => {
  req.roles = [enumUserTypes.ADMIN];

  return validateToken(req, res, next);
};

const validateStaffToken = async (req, res, next) => {
  req.roles = [enumUserTypes.STAFF, enumUserTypes.ADMIN];

  return validateToken(req, res, next);
};

module.exports = { validateAdminToken, validateStaffToken };
