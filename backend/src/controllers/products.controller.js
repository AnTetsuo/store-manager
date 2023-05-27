const { productsService } = require('../services');
const { mapping } = require('../utils/errorMap');

const viewProductsList = async (_req, res) => {
  const { message } = await productsService.getProducts();

  res.status(200).json(message);
};

const viewProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  viewProductById,
  viewProductsList,
};