const errors = new Map();

errors.set('PRODUCT_NOT_FOUND', 404);
errors.set('INVALID_NAME', 422);
errors.set('SALE_NOT_FOUND', 404);
errors.set('INTERNAL_SERVER_ERROR', 500);
errors.set('INVALID_SALE', 422);

const mapping = (type) => errors.get(type) || 500;

module.exports = {
  mapping,
};