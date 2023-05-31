const saleFields = (req, res, next) => {
  const sale = req.body;
  const checkQuantity = sale.every((item) => 'quantity' in item);
  const checkProductId = sale.every((item) => 'productId' in item);
  const param = checkQuantity ? 'productId' : 'quantity';

  if (!checkQuantity || !checkProductId) {
    return res.status(400).json({ message: `"${param}" is required` });
  }
  
  next();
};

const updateFields = (req, res, next) => {
  if (!('quantity' in req.body)) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

module.exports = {
  saleFields,
  updateFields,
};