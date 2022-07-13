const config = require('config');
const debugLogger = require('../logger/debug-logger');

// eslint-disable-next-line no-unused-vars
const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  debugLogger({
    statusCode,
    ...err,
  });

  if (config.get('node_env') === 'production') {
    if (statusCode === 500) {
      return res.status(statusCode).send({ message: 'Internal Server Error' });
    }
  }

  return res.status(statusCode).send({ statusCode, ...err });
};

module.exports = {
  defaultErrorHandler,
};
