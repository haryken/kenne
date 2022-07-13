module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    'Asset',
    {
      assetCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assetName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assetSpec: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      assetLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      installedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'Assets',
    }
  );

  Asset.associate = (models) => {
    Asset.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return Asset;
};
