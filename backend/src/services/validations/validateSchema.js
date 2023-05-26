const {
  intNumSchema,
} = require('./schemas');

const validateNumber = (param) => {
  const { error } = intNumSchema.validate(param);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a integer number' };

  return ({ type: null, message: '' });
};

module.exports = {
  validateNumber,
};