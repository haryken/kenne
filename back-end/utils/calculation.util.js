/* eslint-disable camelcase */
const moment = require('moment');

const createStaffCode = (id) => {
  if (Number(id) < 10) {
    return `SD000${id}`;
  }
  if (Number(id) >= 10 && Number(id) < 100) {
    return `SD00${id}`;
  }
  if (Number(id) >= 100 && Number(id) < 1000) {
    return `SD0${id}`;
  }
  if (Number(id) >= 1000 && Number(id) < 10000) {
    return `SD${id}`;
  }
  return `SD${id}`;
};

const calculateAge = (dateOfBirth, joinedDate) => {
  const year = moment(dateOfBirth).format('YYYY');
  const month = moment(dateOfBirth).format('MM');
  const day = moment(dateOfBirth).format('DD');
  const joinedDate_year = moment(joinedDate).format('YYYY');
  const joinedDate_month = moment(joinedDate).format('MM');
  const joinedDate_day = moment(joinedDate).format('DD');
  let age = Number(joinedDate_year) - Number(year);
  if (
    Number(joinedDate_month) < Number(month) ||
    (Number(joinedDate_month) === Number(month) && Number(joinedDate_day) < Number(day))
  ) {
    age -= 1;
  }
  return age;
};

const createPassword = (username, dateOfBirth) =>
  `${username}@${moment(dateOfBirth).format('DDMMYYYY')}`;

module.exports = {
  createStaffCode,
  calculateAge,
  createPassword,
};
