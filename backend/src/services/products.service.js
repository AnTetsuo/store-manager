const { productsModel } = require('../models');
const schema = require('./validations/validateSchema');

const serverErr = 'Internal server error';

const getProducts = async () => {
  try {
    const products = await productsModel.findAll();
    return { type: null, message: products };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
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
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const addProduct = async (product) => {
  try {
    const validate = schema.validateString(product);
    if (validate.type) return validate;

    const addId = await productsModel.insert(product);
    const added = await productsModel.findById(addId);

    return { type: null, message: added };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const putProduct = async (productId, productInfo) => {
  try {
    const validate = schema.validateString(productInfo);
    if (validate.type) return validate;

    const validId = await productsModel.findById(productId);
    if (!validId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    await productsModel.putProductInfo(productId, productInfo);
    const patchedProduct = await productsModel.findById(productId);

    return { type: null, message: patchedProduct };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const removeProduct = async (productId) => {
  try {
    const validate = schema.validateNumber(productId);
    if (validate.type) return validate;
    
    const validId = await productsModel.findById(productId);
    if (!validId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    await productsModel.remove(productId);
    return { type: null, message: '' };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  putProduct,
  removeProduct,
};