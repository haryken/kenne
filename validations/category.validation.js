const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest.middleware');

function validateCreateCategory(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    slug: Joi.string().required().max(255),
  });

  validateRequest(req, next, schema);
}

module.exports = {
  validateCreateCategory,
};
