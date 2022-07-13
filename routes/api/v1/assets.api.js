const express = require('express');
const asyncHandler = require('express-async-handler');
const assetsController = require('../../../controllers/assets.controller');
const assignmentsController = require('../../../controllers/assignments.controller');
const {
  validateCreateAsset,
  validateUpdateAsset,
} = require('../../../validations/asset.validation');
const { validateAdminToken } = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.get(
  '/:assetID/assignments',
  validateAdminToken,
  asyncHandler(assignmentsController.getAssignmentsByAssignedAssetHandler)
);

router.get('/', asyncHandler(assetsController.getAll));

router.get('/find', validateAdminToken, asyncHandler(assetsController.findAssetsHandler));

router.get('/:id', asyncHandler(assetsController.getById));

router.post('/', [validateAdminToken, validateCreateAsset], asyncHandler(assetsController.create));

router.put('/:id', [validateUpdateAsset, validateAdminToken], assetsController.update);

router.delete('/:id', [validateAdminToken], assetsController.deleteAssetHandler);

module.exports = router;
