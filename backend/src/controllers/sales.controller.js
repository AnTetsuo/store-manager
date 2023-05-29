const { salesService } = require('../services');
const { mapping } = require('../utils/errorMap');

const viewSalesList = async (_req, res) => {
  const { message } = await salesService.getSales();

  res.status(200).json(message);
};

const viewSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(200).json(message);
};

const insertSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.postSale(sale);
  if (type) return res.status(mapping(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  viewSaleById,
  viewSalesList,
  insertSale,
};