const {
  intNumSchema, productSchema,
} = require('./schemas');

const validateNumber = (param) => {
  const { error } = intNumSchema.validate(param);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a integer number' };

  return ({ type: null, message: '' });
};

const validateString = (product) => {
  const { error } = productSchema.validate(product);
  if (error) return { type: 'INVALID_NAME', message: error.message };

  return ({ type: null, message: '' });
};

module.exports = {
  validateNumber,
  validateString,
};