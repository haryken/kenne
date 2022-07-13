const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
// const moment = require('moment');
const { Op } = require('sequelize');
const { getAssignmentAssignedAsset } = require('../services/assignments.service');
const {
  getAllAsset,
  getAssetById,
  createAsset,
  updateAsset,
  findAssets,
  deleteAsset,
} = require('../services/assets.service');
const { getCategoryById } = require('../services/categories.service');
const { Category } = require('../models');

const getAll = async (req, res) => {
  const assets = await getAllAsset();

  return res.status(StatusCodes.OK).json(assets);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const asset = await getAssetById(id);

  if (!asset) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  return res.status(StatusCodes.OK).json(asset);
};

const create = async (req, res) => {
  const { category } = req.body;
  const location = req.user.userLocation;
  const categoryIns = await getCategoryById(category);
  if (categoryIns === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Category is not exist',
    });
  }

  const asset = await createAsset({ ...req.body, location });
  // update assetCode
  asset.assetCode = createAssetCode(asset.id, categoryIns.categorySlug);
  await asset.save();

  return res.status(StatusCodes.CREATED).json({
    ...asset.dataValues,
    Category: categoryIns,
  });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  let asset = await getAssetById(id);

  if (!asset) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  asset = await updateAsset(id, req.body);
  // update asset code
  const categoryIns = await getCategoryById(asset.categoryId);
  if (categoryIns === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Category is not exist',
    });
  }
  asset.assetCode = createAssetCode(asset.id, categoryIns.categorySlug);
  await asset.save();

  return res.status(StatusCodes.OK).json(asset);
};

function createAssetCode(assetId, categorySlug, prefix = 5) {
  let assetCode = '';

  const assetIdStr = assetId.toString();
  const numCharZero = prefix - assetIdStr.length;
  const zeroStr = numCharZero > 0 ? '0'.repeat(numCharZero) : '';
  assetCode = `${categorySlug}${zeroStr}${assetId}`;

  return assetCode;
}

const generateAssetsFilterObject = (categoriesSearch, stateSearch, search) => {
  let whereClause = {};
  let categories = categoriesSearch;
  let state = stateSearch;

  if (categories && categories.length > 0 && !categories.includes(0)) {
    categories = categories.split(',');
    categories = categories.map((category) => parseInt(category, 10));

    whereClause = {
      ...whereClause,
      categoryId: {
        [Op.or]: categories,
      },
    };
  }

  if (state && state.length > 0 && !state.includes('All')) {
    state = state.split(',');

    whereClause = {
      ...whereClause,
      state: {
        [Op.or]: state,
      },
    };
  }

  if (search) {
    whereClause = {
      ...whereClause,
      [Op.or]: [
        { assetCode: { [Op.iLike]: `%${search}%` } },
        { assetName: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }

  return whereClause;
};

const generateAssetsSortObject = (sortBy, order) => {
  const orderByClause = [];

  if (sortBy) {
    switch (sortBy) {
      case 'assetCode':
        orderByClause.push(['assetCode', order]);
        break;
      case 'assetName':
        orderByClause.push(['assetName', order]);
        break;
      case 'categoryName':
        orderByClause.push([{ model: Category, as: 'category' }, 'categoryName', order]);
        break;
      case 'state':
        orderByClause.push(['state', order]);
        break;
      default:
        orderByClause.push(['assetName', order]);
        break;
    }
  }

  return orderByClause;
};

const findAssetsHandler = async (req, res) => {
  const { search, sortBy, page, size, state, categories, specificAssetID } = req.query;
  const assetLocation = req.user.userLocation;
  let { order } = req.query;

  if (!order) {
    order = 'ASC';
  }

  let whereClause = { ...generateAssetsFilterObject(categories, state, search), assetLocation };

  if (specificAssetID) {
    whereClause = { [Op.or]: [{ ...whereClause }, { id: { [Op.eq]: `${specificAssetID}` } }] };
  }

  const orderByClause = generateAssetsSortObject(sortBy, order);

  const assetsRes = await findAssets({ page, size, whereClause, orderByClause });

  res.status(StatusCodes.OK).json({
    assets: assetsRes.rows,
    totalItems: assetsRes.count,
    currentPage: parseInt(page, 10),
    pageSize: parseInt(size, 10),
  });
};

const deleteAssetHandler = async (req, res, next) => {
  const { id } = req.params;
  const asset = await getAssetById(id);
  const assignment = await getAssignmentAssignedAsset(id);
  if (!asset) {
    return next(createError(StatusCodes.NOT_FOUND, 'The asset with this ID does not exist'));
  }
  if (assignment.length > 0) {
    return next(
      createError(
        StatusCodes.NOT_FOUND,
        'Cannot delete the asset because it belongs to one or more historical assignments'
      )
    );
  }

  return res.status(StatusCodes.OK).json({ success: (await deleteAsset(id)) === 1, id });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  findAssetsHandler,
  deleteAssetHandler,
  generateAssetsFilterObject,
  generateAssetsSortObject,
};
