module.exports = {
  up: async (queryInterface) => {
    queryInterface.addConstraint('Assignments', {
      fields: ['acceptedBy'],
      type: 'foreign key',
      name: 'fk_assigments_users_accepted_by', // optional
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeConstraint('Assignments', 'fk_assigments_users_accepted_by');
  },
};
