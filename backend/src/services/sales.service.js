const { salesModel } = require('../models');
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

module.exports = {
  getSales,
  getSalesById,
};