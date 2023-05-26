const { productsModel } = require('../models');
const schema = require('./validations/validateSchema');

const getProducts = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const validate = schema.validateNumber(productId);
  if (validate.type) return validate;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  getProducts,
  getProductById,
};