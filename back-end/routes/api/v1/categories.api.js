const express = require('express');
const asyncHandler = require('express-async-handler');
const categoriesController = require('../../../controllers/categories.controller');
const { validateCreateCategory } = require('../../../validations/category.validation');

const router = express.Router();

router.get('/', asyncHandler(categoriesController.getAll));

router.post('/', validateCreateCategory, asyncHandler(categoriesController.create));

module.exports = router;
