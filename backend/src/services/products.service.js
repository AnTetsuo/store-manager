const { productsModel } = require('../models');
const schema = require('./validations/validateSchema');

const getProducts = async () => {
  try {
    const products = await productsModel.findAll();
    return { type: null, message: products };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server Error' };
  }
};

const getProductById = async (productId) => {
  try {
    const validate = schema.validateNumber(productId);
    if (validate.type) return validate;

    const product = await productsModel.findById(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    return { type: null, message: product };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server Error' };
  }
};

module.exports = {
  getProducts,
  getProductById,
};