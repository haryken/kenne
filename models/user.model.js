module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM({
          values: ['Male', 'Female'],
        }),
        allowNull: false,
      },
      joinedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM({
          values: ['Admin', 'Staff'],
        }),
        allowNull: false,
      },
      staffCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      firstTimeLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      tableName: 'Users',
    }
  );

  return Users;
};
