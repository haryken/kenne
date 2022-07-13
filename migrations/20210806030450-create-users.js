module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM({
          values: ['Male', 'Female'],
        }),
        allowNull: false,
      },
      joinedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      userType: {
        type: Sequelize.ENUM({
          values: ['Admin', 'Staff'],
        }),
        allowNull: false,
      },
      staffCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      firstTimeLogin: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
