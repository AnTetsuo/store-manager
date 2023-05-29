const Joi = require('joi');

const intNumSchema = Joi.number().required();
const stringSchema = Joi.string().min(5).required();

const productSchema = Joi.object({
  name: stringSchema,
 });

module.exports = {
  intNumSchema,
  productSchema,
};