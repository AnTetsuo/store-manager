const productName = (req, res, next) => {
  const product = req.body;
  if (!product.name) return res.status(400).json({ message: '"name" is required' });

  next();
};

module.exports = {
  productName,
};