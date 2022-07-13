const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest.middleware');

function validateCreatePost(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    postText: Joi.string().required().max(1024),
    imageURL: Joi.string().required().max(1024),
  });

  validateRequest(req, next, schema);
}

module.exports = {
  validateCreatePost,
};
