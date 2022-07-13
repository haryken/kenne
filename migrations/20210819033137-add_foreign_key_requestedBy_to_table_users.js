module.exports = {
  up: async (queryInterface) => {
    queryInterface.addConstraint('Assignments', {
      fields: ['requestedBy'],
      type: 'foreign key',
      name: 'fk_assigments_users_requested_by', // optional
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeConstraint('Assignments', 'fk_assigments_users_requested_by');
  },
};
