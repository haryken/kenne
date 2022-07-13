module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define(
    'Assignments',
    {
      assignedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      returnedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      assignmentState: {
        type: DataTypes.ENUM({
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assignedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      acceptedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assignedAsset: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'Assignments',
    }
  );

  Assignments.associate = (models) => {
    Assignments.belongsTo(models.Users, { foreignKey: 'assignedTo', as: 'Assigned_To' });
    Assignments.belongsTo(models.Users, { foreignKey: 'assignedBy', as: 'Assigned_By' });
    Assignments.belongsTo(models.Users, { foreignKey: 'requestedBy', as: 'Requested_By' });
    Assignments.belongsTo(models.Users, { foreignKey: 'acceptedBy', as: 'Accepted_By' });
    Assignments.belongsTo(models.Asset, { foreignKey: 'assignedAsset' });
  };

  return Assignments;
};
