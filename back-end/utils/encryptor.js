const bcrypt = require('bcryptjs');

const encrypt = (plainString) => bcrypt.hashSync(plainString);

const compare = (plainString, hashString) => bcrypt.compareSync(plainString, hashString);

module.exports = {
  encrypt,
  compare,
};
