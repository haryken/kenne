const { encrypt } = require('../utils/encryptor');

/* eslint-disable no-unused-vars */
const defaultPassword = '123456';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Long',
        lastName: 'Nguyen Tran Phan',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0001',
        username: 'admin_1',
        userLocation: 'HCM',
        password: encrypt(defaultPassword),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Kien',
        lastName: 'Nguyen Trung',
        dateOfBirth: '2000-05-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0004',
        username: 'admin_2',
        userLocation: 'HCM',
        password: encrypt(defaultPassword),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Khang',
        lastName: 'Nguyen Tran Phan',
        dateOfBirth: '2000-08-25',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Staff',
        staffCode: 'SD0002',
        username: 'staff_1',
        userLocation: 'HCM',
        password: encrypt(defaultPassword),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Thi',
        lastName: 'Nguyen Tran Phuong',
        dateOfBirth: '2000-06-25',
        gender: 'Female',
        joinedDate: '2021-08-02',
        userType: 'Staff',
        staffCode: 'SD0003',
        username: 'staff_2',
        userLocation: 'HCM',
        password: encrypt(defaultPassword),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
