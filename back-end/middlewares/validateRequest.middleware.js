const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return next(
      createError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`
      )
    );
  }
  req.body = value;
  return next();
}

module.exports = validateRequest;
