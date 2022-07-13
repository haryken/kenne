module.exports = {
  up: async (queryInterface) => {
    queryInterface.addConstraint('Assignments', {
      fields: ['assignedTo'],
      type: 'foreign key',
      name: 'fk_assigments_users_to', // optional
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeConstraint('Assignments', 'fk_assigment_users_to');
  },
};
