const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const mock = require('./mocks/product.service.mock');

describe('00 - PRODUCTS - SERVICE ', function () {
  describe('GET "/"', function () {
    it('Returns an object with type "null" and a message with the product list', async function () {
      sinon.stub(productsModel, 'findAll').resolves(mock.productList);

      const result = await productsService.getProducts();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.productList);
    });
  });

  describe('GET "/:id"', function () {
    it('On success - returns an object with type "null", and product info', async function () {
      sinon.stub(productsModel, 'findById').resolves(mock.productList[0]);

      const result = await productsService.getProductById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.productList[0]);
    });
    it('On failure - returns type "PRODUCT_NOT_FOUND" and accordingly message', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.getProductById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
  afterEach(function () { sinon.restore(); });
});