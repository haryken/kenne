const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const moment = require('moment');
const { calculateAge } = require('../utils/calculation.util');
const { userType, gender } = require('../utils/enums.util');

// eslint-disable-next-line consistent-return
const verifyCreateUser = (req, res, next) => {
  if (req.body.firstName.includes(' ')) {
    return next(createError(StatusCodes.BAD_REQUEST, 'First name do not include spaces!'));
  }
  if (req.body.lastName.slice(-1).includes(' ')) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'The end of the last name cannot be a space!')
    );
  }
  if (!userType().includes(req.body.userType)) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `Failed! Role ${req.body.userType.toString()} does not exist!`
      )
    );
  }
  if (!gender().includes(req.body.gender)) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `Failed! Gender ${req.body.gender.toString()} does not exist!`
      )
    );
  }
  if (moment(req.body.dateOfBirth).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Date of birth is not later than today. Please select a different date'
      )
    );
  }
  if (['Saturday', 'Sunday'].includes(moment(req.body.joinedDate).format('dddd').toString())) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Joined date is Saturday or Sunday. Please select a different date!'
      )
    );
  }
  if (
    moment(req.body.dateOfBirth).format('YYYY-MM-DD') >
    moment(req.body.joinedDate).format('YYYY-MM-DD')
  ) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Joined date is not later than Date of Birth. Please select a different date'
      )
    );
  }
  if (calculateAge(req.body.dateOfBirth, new Date()) < 18) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'User is under 18. Please select a different date')
    );
  }
  if (calculateAge(req.body.dateOfBirth, req.body.joinedDate) < 18) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'User is under 18. Please select a different date')
    );
  }
  next();
};

// eslint-disable-next-line consistent-return
const verifyEditUser = (req, res, next) => {
  if (!userType().includes(req.body.userType)) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `Failed! Role ${req.body.userType.toString()} does not exist!`
      )
    );
  }
  if (!gender().includes(req.body.gender)) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        `Failed! Gender ${req.body.gender.toString()} does not exist!`
      )
    );
  }
  if (moment(req.body.dateOfBirth).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Date of birth is not later than today. Please select a different date'
      )
    );
  }
  if (['Saturday', 'Sunday'].includes(moment(req.body.joinedDate).format('dddd').toString())) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Joined date is Saturday or Sunday. Please select a different date!'
      )
    );
  }
  if (
    moment(req.body.dateOfBirth).format('YYYY-MM-DD') >
    moment(req.body.joinedDate).format('YYYY-MM-DD')
  ) {
    return next(
      createError(
        StatusCodes.BAD_REQUEST,
        'Joined date is not later than Date of Birth. Please select a different date'
      )
    );
  }
  if (calculateAge(req.body.dateOfBirth, new Date()) < 18) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'User is under 18. Please select a different date')
    );
  }
  if (calculateAge(req.body.dateOfBirth, req.body.joinedDate) < 18) {
    return next(
      createError(StatusCodes.BAD_REQUEST, 'User is under 18. Please select a different date')
    );
  }
  next();
};

module.exports = {
  verifyCreateUser,
  verifyEditUser,
};
