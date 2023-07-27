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

const saleFormat = (req, res, next) => {
  const sale = req.body;

  if (!Array.isArray(sale)) { 
    return res.status(400)
      .json({ message: 'At least one product is required to post the sale' });
  }

  if (sale.length === 0) {
    return res.status(400)
    .json({ message: 'At least one product is required to post the sale' });
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
  saleFormat,
};