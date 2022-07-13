module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Assets', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => queryInterface.removeColumn('Assets', 'categoryId'),
};
