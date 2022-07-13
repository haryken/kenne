module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      assignedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      returnedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      assignmentState: {
        type: Sequelize.ENUM({
          values: [
            'WAITING_FOR_ACCEPTANCE',
            'ACCEPTED',
            'WAITING_FOR_RETURNING',
            'COMPLETED',
            'DECLINED',
          ],
        }),
        defaultValue: 'WAITING_FOR_ACCEPTANCE',
      },
      assignedTo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assignedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assignedAsset: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Assignments');
  },
};
