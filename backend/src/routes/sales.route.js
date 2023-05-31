const express = require('express');
const { salesController } = require('../controllers');
const { saleFields } = require('../middlewares/sales');

const salesRoute = express.Router();

salesRoute.get('/', salesController.viewSalesList);
salesRoute.post('/', saleFields, salesController.insertSale);
salesRoute.get('/:id', salesController.viewSaleById);
salesRoute.delete('/:id', salesController.removeSale);

module.exports = salesRoute;
