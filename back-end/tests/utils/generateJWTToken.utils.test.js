const jwt = require('jsonwebtoken');
const config = require('config');
const { generateJWTToken } = require('../../utils/generateJWTToken');

describe('Generate JWT Token Utils', () => {
  test(`Validate JWT Token`, () => {
    const token = generateJWTToken({ username: 'messi' });
    const validToken = jwt.verify(token, config.get('jwt_secret'));
    const { username } = validToken.data;

    expect(username).toEqual('messi');
  });
});
