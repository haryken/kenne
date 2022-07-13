module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'Posts',
    }
  );

  return Posts;
};
