const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validateSchema');

const serverErr = 'Internal server error';

const getSales = async () => {
  try {
    const sales = await salesModel.findAll();
    return { type: null, message: sales };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const getSalesById = async (saleId) => {
  try {
    const validate = schema.validateNumber(saleId);
    if (validate.type) return validate;

    const sale = await salesModel.findById(saleId);
    if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    return { type: null, message: sale };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const postSale = async (sales) => {
  try {
    const validate = sales.map((sale) => schema.validateSale(sale));
    const [someIsInvalid] = validate.filter(({ type }) => type === 'INVALID_SALE');
    if (someIsInvalid) return someIsInvalid;

    const validatePIds = sales.map((sale) => sale.productId);
    const idsFound = await Promise.all(validatePIds.map((id) => productsModel.findById(id)));
    const areFound = idsFound.every((id) => id !== undefined);
    if (!areFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    const addedSale = await salesModel.insertSale(sales);
    return { type: null, message: addedSale };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const deleteSale = async (saleId) => {
  try {
    const validate = schema.validateNumber(saleId);
    if (validate.type) return validate;

    const sale = await salesModel.dateById(saleId);
    if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    await salesModel.remove(saleId);

    return { type: null, message: '' };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

const updateProductQuantity = async (saleId, productId, quantity) => {
  try {
    const validate = schema.validateUpdate({ saleId, productId, quantity });
    if (validate.type) return validate;

    const sale = await salesModel.dateById(saleId);
    if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    const productNNsale = await salesModel.findById(saleId);
    const productInSale = productNNsale.some((product) => product.productId === Number(productId));
    if (!productInSale) {
      return { type: 'PRODUCT_NOT_IN_SALE', message: 'Product not found in sale' };
    }

    await salesModel.updateProductQuantity(saleId, productId, quantity);
    const getUpdated = await salesModel.findById(saleId);
    const updated = getUpdated.find((product) => product.productId === Number(productId));
    updated.saleId = Number(saleId);

    return { type: null, message: updated };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: serverErr };
  }
};

module.exports = {
  getSales,
  getSalesById,
  postSale,
  deleteSale,
  updateProductQuantity,
};