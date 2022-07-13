const moment = require('moment');
const {
  getAllAsset,
  getAssetById,
  createAsset,
  updateAsset,
  updateAssetState,
  deleteAsset,
} = require('../../services/assets.service');
const { enumAssetState } = require('../../utils/enums.util');

describe('Assets Services', () => {
  let createdAssetID;

  test(`Create Asset Function`, async () => {
    const assetData = {
      name: 'Laptop Testing 1',
      category: 1,
      specification: 'Lorem Ipsum Amet',
      location: 'HCM',
      installedDate: '2021-08-20',
      state: enumAssetState.AVAILABLE,
    };
    const newAsset = await createAsset(assetData);

    createdAssetID = newAsset.id;

    expect(newAsset.assetName).toEqual(assetData.name);
    expect(newAsset.assetSpec).toEqual(assetData.specification);
    expect(newAsset.assetLocation).toEqual(assetData.location);
    expect(moment(newAsset.installedDate).format('YYYY-MM-DD')).toEqual(assetData.installedDate);
    expect(newAsset.state).toEqual(assetData.state);
    expect(newAsset.categoryId).toEqual(assetData.category);
  });

  test(`Get All Asset Function`, async () => {
    const assets = await getAllAsset();

    expect(assets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          assetName: expect.any(String),
          assetSpec: expect.any(String),
          assetLocation: expect.any(String),
          installedDate: expect.any(Date),
          state: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Asset By Id Function`, async () => {
    const asset = await getAssetById(createdAssetID);

    expect(asset).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        assetName: expect.any(String),
        assetSpec: expect.any(String),
        assetLocation: expect.any(String),
        installedDate: expect.any(Date),
        state: expect.any(String),
      })
    );
  });

  test(`Update Asset State Function`, async () => {
    const asset = await updateAssetState(createdAssetID, enumAssetState.NOT_AVAILABLE);

    expect(asset.state).toEqual(enumAssetState.NOT_AVAILABLE);
  });

  test(`Update Asset Function`, async () => {
    const modifiedAssetData = {
      name: 'Laptop Testing 2',
      category: 2,
      specification: 'Lorem Ipsum Amet Sin',
      installedDate: '2022-08-20',
      state: enumAssetState.WAITING_FOR_RECYCLING,
    };
    const updatedAsset = await updateAsset(createdAssetID, modifiedAssetData);

    expect(updatedAsset.assetName).toEqual(modifiedAssetData.name);
    expect(updatedAsset.assetSpec).toEqual(modifiedAssetData.specification);
    expect(moment(updatedAsset.installedDate).format('YYYY-MM-DD')).toEqual(
      modifiedAssetData.installedDate
    );
    expect(updatedAsset.state).toEqual(modifiedAssetData.state);
    expect(updatedAsset.categoryId).toEqual(modifiedAssetData.category);
  });

  test(`Delete Asset Function`, async () => {
    const deletedAsset = await deleteAsset(createdAssetID);

    expect(deletedAsset).toEqual(1);
  });
});
