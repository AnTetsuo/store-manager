const express = require('express');
const { productsController } = require('../controllers');
const { productName } = require('../middlewares/productMid');

const productsRoute = express.Router();

productsRoute.get('/', productsController.viewProductsList);
productsRoute.get('/:id', productsController.viewProductById);
productsRoute.post('/', productName, productsController.insertProduct);
productsRoute.put('/:id', productName, productsController.editProduct);
productsRoute.delete('/:id', productsController.deleteProduct);

module.exports = productsRoute;
