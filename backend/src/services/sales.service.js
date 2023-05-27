const { salesModel } = require('../models');
const schema = require('./validations/validateSchema');

const getSales = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const getSalesById = async (saleId) => {
  const validate = schema.validateNumber(saleId);
  if (validate.type) return validate;

  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  getSales,
  getSalesById,
};