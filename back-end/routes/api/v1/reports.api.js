const express = require('express');
const asyncHandler = require('express-async-handler');
const reportController = require('../../../controllers/reports.controller');
const { validateAdminToken } = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.get('/', validateAdminToken, asyncHandler(reportController.getAll));

module.exports = router;
