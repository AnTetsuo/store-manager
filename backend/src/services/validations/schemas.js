const Joi = require('joi');

const intNumSchema = Joi.number().required();

module.exports = {
  intNumSchema,
};