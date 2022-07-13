const { StatusCodes } = require('http-status-codes');
const sequelize = require('sequelize');
const { getAssetByState } = require('../services/reports.service');
const { enumAssetState } = require('../utils/enums.util');

const generateAssetIncludeObject = async (location) => {
  const includes = [];

  Object.keys(enumAssetState).forEach((key) => {
    if (key === 'ALL')
      includes.push([
        sequelize.literal(
          `(SELECT count(*) FROM "Assets" WHERE "Assets"."categoryId" = "Category"."id" and "Assets"."assetLocation" = '${location}')`
        ),
        `total`,
      ]);
    else {
      includes.push([
        sequelize.literal(
          `(SELECT count(*) FROM "Assets" WHERE "Assets"."categoryId" = "Category"."id" and "Assets"."state" = '${enumAssetState[key]}' and "Assets"."assetLocation" = '${location}')`
        ),
        `COUNT_${key}`,
      ]);
    }
  });

  return includes;
};

const generateAssetsSortObject = (sortBy, order) => {
  const orderByClause = [];

  if (sortBy) {
    switch (sortBy) {
      case 'category':
        orderByClause.push(['categoryName', order]);
        break;
      case 'total':
        orderByClause.push([sequelize.literal('total'), order]);
        break;
      case 'assigned':
        orderByClause.push([sequelize.literal(`"COUNT_ASSIGNED"`), order]);
        break;
      case 'available':
        orderByClause.push([sequelize.literal(`"COUNT_AVAILABLE"`), order]);
        break;
      case 'notAvailable':
        orderByClause.push([sequelize.literal(`"COUNT_NOT_AVAILABLE"`), order]);
        break;
      case 'waiting_for_recycling':
        orderByClause.push([sequelize.literal(`"COUNT_WAITING_FOR_RECYCLING"`), order]);
        break;
      case 'recycled':
        orderByClause.push([sequelize.literal(`"COUNT_RECYCLED"`), order]);
        break;
      default:
        orderByClause.push([['categoryName', order]]);
        break;
    }
  }

  return orderByClause;
};

const getAll = async (req, res) => {
  const { sortBy } = req.query;
  let { order } = req.query;
  const { userLocation } = req.user;

  if (!order) {
    order = 'ASC';
  }

  const includeClause = await generateAssetIncludeObject(userLocation);
  const orderByClause = await generateAssetsSortObject(sortBy, order);

  const reports = await getAssetByState(includeClause, orderByClause);

  return res.status(StatusCodes.OK).json(reports);
};

module.exports = {
  getAll,
  generateAssetsSortObject,
};
