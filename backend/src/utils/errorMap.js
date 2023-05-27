const errors = new Map();

errors.set('PRODUCT_NOT_FOUND', 404);
errors.set('SALE_NOT_FOUND', 404);

const mapping = (type) => errors.get(type) || 500;

module.exports = {
  mapping,
};