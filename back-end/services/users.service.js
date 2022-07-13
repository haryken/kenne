const { Op } = require('sequelize');
const moment = require('moment');
const { Users } = require('../models');
const { createStaffCode, createPassword } = require('../utils/calculation.util');
const { encrypt, compare } = require('../utils/encryptor');

const userLogin = async (userDetails) => {
  const { username, password } = userDetails;

  const existedUser = await Users.findOne({
    where: { username },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  if (!existedUser || !compare(password, existedUser.password)) {
    return false;
  }

  return existedUser;
};

const getUser = async (id) => Users.findByPk(id);

const updateStaffCode = async (id) => {
  const user = await getUser(id);

  user.staffCode = createStaffCode(Number(id));

  await user.save();

  return getUser(id);
};

const createUser = async (newUser, username, location) => {
  const { firstName, lastName, dateOfBirth, joinedDate, gender, userType } = newUser;
  const password = encrypt(createPassword(username, dateOfBirth));
  const user = await Users.create({
    firstName,
    lastName,
    dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
    joinedDate: moment(joinedDate).format('YYYY-MM-DD'),
    gender,
    userType,
    username,
    password,
    userLocation: location,
  });

  return updateStaffCode(Number(user.id));
};

const arrayUsername = (username) =>
  Users.findAll({
    where: {
      username: {
        [Op.like]: `%${username}%`,
      },
    },
    attributes: ['username'],
  });

const countUser = () => Users.count();

const editUser = async (data) => {
  const { id, dateOfBirth, gender, joinedDate, userType } = data;
  const user = await getUser(Number(id));
  user.dateOfBirth = dateOfBirth;
  user.gender = gender;
  user.joinedDate = joinedDate;
  user.userType = userType;
  await user.save();
  return getUser(Number(id));
};

const getUserByID = async (userID) => Users.findByPk(userID);

const changePassword = async (userID, userPassword) => {
  const existedUser = await getUserByID(userID);

  if (!existedUser) {
    return false;
  }

  existedUser.password = encrypt(userPassword);
  existedUser.firstTimeLogin = false;

  await existedUser.save();

  return existedUser;
};

const disableUser = async (id) => {
  const user = await getUser(Number(id));
  user.disabled = true;
  return user.save();
};

module.exports = {
  createUser,
  arrayUsername,
  updateStaffCode,
  getUser,
  countUser,
  userLogin,
  editUser,
  changePassword,
  getUserByID,
  disableUser,
};
