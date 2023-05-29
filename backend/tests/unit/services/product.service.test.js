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

  describe('POST "/"', function () {
    it('On success - returns an object with type "null", and the product info', async function () {
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 1 }]);
      sinon.stub(productsModel, 'findById').resolves({ productId: 1, name: 'Axe"s Axe' });

      const result = await productsService.addProduct({ name: 'Axe"s Axe' });
      
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ productId: 1, name: 'Axe"s Axe' });
    });

    describe('On failure', function () {
      it('name is not of type string', async function () {
        const result = await productsService.addProduct({ name: 123 });

        expect(result.type).to.equal('INVALID_VALUE');
        expect(result.message).to.deep.equal('"name" must be a string');
      });
      it('name is not 5 characters long', async function () {
        const result = await productsService.addProduct({ name: 'Axe' });

        expect(result.type).to.equal('INVALID_VALUE');
        expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
      });
    });
  });
  afterEach(function () { sinon.restore(); });
});