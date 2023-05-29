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

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.addProduct(product);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  viewProductById,
  viewProductsList,
  insertProduct,
};