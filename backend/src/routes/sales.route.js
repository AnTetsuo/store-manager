const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/', salesController.viewSalesList);
salesRoute.get('/:id', salesController.viewSaleById);

module.exports = salesRoute;
