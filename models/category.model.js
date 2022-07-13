module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categorySlug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'Categories',
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Asset, {
      onDelete: 'cascade',
      foreignKey: { field: 'categoryId', allowNull: false },
    });
  };

  return Category;
};
