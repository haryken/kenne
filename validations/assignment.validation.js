const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest.middleware');

function validateCreateAssignment(req, res, next) {
  const schema = Joi.object({
    assignedDate: Joi.string().required(),
    note: Joi.string().allow('').optional(),
    assignedTo: Joi.alternatives(Joi.number(), Joi.string()).required(),
    assignedAsset: Joi.alternatives(Joi.number(), Joi.string()).required(),
  });
  validateRequest(req, next, schema);
}

function validateEditAssignment(req, res, next) {
  const schema = Joi.object({
    id: Joi.alternatives(Joi.number(), Joi.string()).required(),
    assignedDate: Joi.string().required(),
    note: Joi.string().allow('').optional(),
    assignedTo: Joi.alternatives(Joi.number(), Joi.string()).required(),
    assignedAsset: Joi.alternatives(Joi.number(), Joi.string()).required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  validateCreateAssignment,
  validateEditAssignment,
};
