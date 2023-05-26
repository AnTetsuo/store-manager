const express = require('express');
const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute.get('/', productsController.viewProductsList);
productsRoute.get('/:id', productsController.viewProductById);

module.exports = productsRoute;
