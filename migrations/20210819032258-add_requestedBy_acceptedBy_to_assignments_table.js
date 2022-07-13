module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('Assignments', 'requestedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Assignments', 'acceptedBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]),

  down: async (queryInterface) =>
    Promise.all([
      queryInterface.removeColumn('Assignments', 'requestedBy'),
      queryInterface.removeColumn('Assignments', 'acceptedBy'),
    ]),
};
