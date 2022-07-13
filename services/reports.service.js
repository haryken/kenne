const { Category } = require('../models');

const getAssetByState = async (includeClause, orderByClause) =>
  Category.findAndCountAll({
    attributes: {
      include: includeClause,
    },
    order: orderByClause,
  });

module.exports = {
  getAssetByState,
};
