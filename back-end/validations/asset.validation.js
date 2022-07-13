const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest.middleware');

function validateCreateAsset(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    category: Joi.number().integer().required(),
    specification: Joi.string().required(),
    location: Joi.string().required().max(255),
    installedDate: Joi.date().required(),
    state: Joi.string().required().max(255),
  });

  validateRequest(req, next, schema);
}

function validateUpdateAsset(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    category: Joi.number().integer().required(),
    specification: Joi.string().required(),
    location: Joi.string().required().max(255),
    installedDate: Joi.date().required(),
    state: Joi.string().required().max(255),
  });

  validateRequest(req, next, schema);
}

module.exports = {
  validateCreateAsset,
  validateUpdateAsset,
};
