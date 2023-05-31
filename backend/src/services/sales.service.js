const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validateSchema');

const getSales = async () => {
  try {
    const sales = await salesModel.findAll();
    return { type: null, message: sales };
  } catch (error) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
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
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
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
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
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
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
  }
};

module.exports = {
  getSales,
  getSalesById,
  postSale,
  deleteSale,
};