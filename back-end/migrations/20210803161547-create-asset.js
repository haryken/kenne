module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      assetCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assetName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assetSpec: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assetLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      installedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Assets');
  },
};
