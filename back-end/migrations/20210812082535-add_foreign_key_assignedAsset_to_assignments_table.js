module.exports = {
  up: async (queryInterface) => {
    queryInterface.addConstraint('Assignments', {
      fields: ['assignedAsset'],
      type: 'foreign key',
      name: 'fk_assigments_assets', // optional
      references: {
        table: 'Assets',
        field: 'id',
      },
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeConstraint('Assignments', 'fk_assigments_assets');
  },
};
