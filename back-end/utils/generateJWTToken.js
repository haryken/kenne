const jwt = require('jsonwebtoken');
const config = require('config');

const generateJWTToken = (userDetails) => {
  const token = jwt.sign(
    {
      expiresIn: config.get('jwt_expired_date'),
      data: userDetails,
    },
    config.get('jwt_secret')
  );

  return token;
};

module.exports = {
  generateJWTToken,
};
