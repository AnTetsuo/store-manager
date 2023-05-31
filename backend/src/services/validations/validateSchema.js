const {
  productSchema, RegSaleSchema, IdSchema, updateSchema,
} = require('./schemas');

const validateNumber = (param) => {
  const { error } = IdSchema.validate({ id: param });
  if (error) return { type: 'INVALID_ID', message: error.message };

  return ({ type: null, message: '' });
};

const validateString = (product) => {
  const { error } = productSchema.validate(product);
  if (error) return { type: 'INVALID_NAME', message: error.message };

  return ({ type: null, message: '' });
};

const validateSale = (sale) => {
  const { error } = RegSaleSchema.validate(sale);
  if (error) return { type: 'INVALID_SALE', message: error.message };

  return ({ type: null, message: '' });
};

const validateUpdate = (update) => {
  const { error } = updateSchema.validate(update);
  if (error) return { type: 'INVALID_UPDATE_INFO', message: error.message };

  return ({ type: null, message: '' });
};

module.exports = {
  validateNumber,
  validateString,
  validateSale,
  validateUpdate,
};