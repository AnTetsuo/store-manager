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

const editProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const { type, message } = await productsService.putProduct(id, product);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.removeProduct(id);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(204).json();
};

const queryProducts = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.queryProducts(q);
  
  res.status(200).json(message);
};

module.exports = {
  viewProductById,
  viewProductsList,
  insertProduct,
  editProduct,
  deleteProduct,
  queryProducts,
};