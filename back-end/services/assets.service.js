const { Asset, Category } = require('../models');

const getAllAsset = async () => Asset.findAll();

const getAssetById = async (id) => Asset.findByPk(id, { include: Category });

const createAsset = async (newAsset) => {
  const { name, category, specification, location, installedDate, state } = newAsset;
  return Asset.create({
    assetName: name,
    CategoryId: category,
    categoryId: category,
    assetSpec: specification,
    assetLocation: location,
    installedDate,
    state,
  });
};

const updateAsset = async (id, modifiedPost) => {
  const asset = await getAssetById(id);
  const { name, category, specification, installedDate, state } = modifiedPost;

  asset.assetName = name;
  asset.categoryId = category;
  asset.assetSpec = specification;
  asset.installedDate = installedDate;
  asset.state = state;
  asset.updatedAt = new Date();

  await asset.save();

  return asset;
};

const findAssets = async (searchObject) => {
  const { page, size, whereClause, orderByClause } = searchObject;

  return Asset.findAndCountAll({
    where: whereClause,
    order: orderByClause,
    include: [
      {
        model: Category,
      },
    ],
    offset: (page - 1) * size,
    limit: size,
  });
};

const updateAssetState = async (id, assetState) => {
  const asset = await getAssetById(id);
  asset.state = assetState;
  await asset.save();
  return getAssetById(id);
};

const deleteAsset = async (id) =>
  Asset.destroy({
    where: {
      id,
    },
  });

module.exports = {
  getAllAsset,
  getAssetById,
  createAsset,
  updateAsset,
  findAssets,
  updateAssetState,
  deleteAsset,
};
