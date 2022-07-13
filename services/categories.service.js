const { Category } = require('../models');

const getAllCategory = async () => Category.findAll();

const getCategoryById = async (id) => Category.findByPk(id);

const getCategoryByName = async (name) => Category.findOne({ where: { categoryName: name } });

const getCategoryBySlug = async (slug) => Category.findOne({ where: { categorySlug: slug } });

const createCategory = async (newCategory) => {
  const { name, slug } = newCategory;
  return Category.create({
    categoryName: name,
    categorySlug: slug,
  });
};

module.exports = {
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  getCategoryBySlug,
  createCategory,
};
