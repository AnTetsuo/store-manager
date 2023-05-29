const express = require('express');
const { salesController } = require('../controllers');
const { saleFields } = require('../middlewares/sales');

const salesRoute = express.Router();

salesRoute.get('/', salesController.viewSalesList);
salesRoute.get('/:id', salesController.viewSaleById);
salesRoute.post('/', saleFields, salesController.insertSale);

module.exports = salesRoute;
