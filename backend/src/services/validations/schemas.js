const Joi = require('joi');

const intNumSchema = Joi.number().min(1).required();
const stringSchema = Joi.string().min(5).required();

const IdSchema = Joi.object({
  id: intNumSchema,
});

const RegSaleSchema = Joi.object({
  productId: intNumSchema,
  quantity: intNumSchema,
});

const productSchema = Joi.object({
  name: stringSchema,
 });

module.exports = {
  IdSchema,
  productSchema,
  RegSaleSchema,
};