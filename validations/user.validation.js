const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const validateRequest = require('../middlewares/validateRequest.middleware');
const { compare } = require('../utils/encryptor');

function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().max(255),
    password: Joi.string().required().max(1024),
  });

  validateRequest(req, next, schema);
}
function validateCreateUser(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    joinedDate: Joi.string().required(),
    gender: Joi.string().required(),
    userType: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function validateEditUser(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    joinedDate: Joi.string().required(),
    gender: Joi.string().required(),
    userType: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

const validateUserChangePassword = (body, existedUser) => {
  const { password, oldPassword, newPassword } = body;
  const { firstTimeLogin } = existedUser;

  // Validation for the first time the users change password
  if (firstTimeLogin) {
    // This is the first time change so the field password is required
    if (!password) {
      return createError(StatusCodes.BAD_REQUEST, 'Something is wrong with this request');
    }
    // If the current password and the entered password are the same we reject it
    if (compare(password, existedUser.password)) {
      return createError(StatusCodes.BAD_REQUEST, 'Please enter a different password');
    }
  }

  // Validation for every other times after the first time
  if (!firstTimeLogin) {
    // Old password and new password fields are required for changing password after the first time
    if (!oldPassword || !newPassword) {
      return createError(StatusCodes.BAD_REQUEST, 'Something is wrong with this request');
    }
    // If the old password and the current password in the database are not the same we reject it
    if (!compare(oldPassword, existedUser.password)) {
      return createError(StatusCodes.BAD_REQUEST, 'Password is incorrect');
    }
    // If the current password and the new password are the same we reject it
    if (compare(newPassword, existedUser.password)) {
      return createError(StatusCodes.BAD_REQUEST, 'Please enter a different password');
    }
  }

  return false;
};

module.exports = {
  validateUserLogin,
  validateCreateUser,
  validateEditUser,
  validateUserChangePassword,
};
