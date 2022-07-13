const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const {
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  getCategoryBySlug,
  createCategory,
} = require('../services/categories.service');

const getAll = async (req, res) => {
  const categories = await getAllCategory();

  return res.status(StatusCodes.OK).json(categories);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const category = await getCategoryById(id);

  if (!category) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  return res.status(StatusCodes.OK).json(category);
};

const create = async (req, res) => {
  const { name, slug } = req.body;
  const catNameInstance = await getCategoryByName(name);
  if (catNameInstance != null)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Category is already existed. Please enter a different category' });

  const catSlugInstance = await getCategoryBySlug(slug);
  if (catSlugInstance != null)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Prefix is already existed. Please enter a different prefix' });

  const category = await createCategory(req.body);
  return res.status(StatusCodes.CREATED).json(category);
};

module.exports = {
  getAll,
  create,
  getById,
};
