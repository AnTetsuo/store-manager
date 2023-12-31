const express = require('express');
const { salesController } = require('../controllers');
const { saleFields, updateFields, saleFormat } = require('../middlewares/sales');

const salesRoute = express.Router();

salesRoute.get('/', salesController.viewSalesList);
salesRoute.post('/', saleFormat, saleFields, salesController.insertSale);
salesRoute.get('/:id', salesController.viewSaleById);
salesRoute.put(
  '/:saleId/products/:productId/quantity', 
  updateFields,
  salesController.updateQuantity,
);
salesRoute.delete('/:id', salesController.removeSale);

module.exports = salesRoute;
