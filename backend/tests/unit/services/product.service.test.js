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

        expect(result.type).to.equal('INVALID_NAME');
        expect(result.message).to.deep.equal('"name" must be a string');
      });
      it('name is not 5 characters long', async function () {
        const result = await productsService.addProduct({ name: 'Axe' });

        expect(result.type).to.equal('INVALID_NAME');
        expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
      });
    });
  });

  describe('PUT "/:id"', function () {
    it('On success - returns an object with type "null", and the product', async function () {
      const pmStub = sinon.stub(productsModel, 'findById');
      sinon.stub(productsModel, 'putProductInfo').resolves(1);
      pmStub.onFirstCall().resolves({ id: 1, name: 'product1' });
      pmStub.onSecondCall().resolves({ id: 1, name: 'OneProduct' });

      const patched = await productsService.putProduct(1, { name: 'OneProduct' });

      expect(patched.type).to.equal(null);
      expect(patched.message).to.deep.equal({ id: 1, name: 'OneProduct' });
    });

    describe('On failure', function () {
      it('schema validation - invalid type of "name"', async function () {
        const patched = await productsService.putProduct(1, { name: 123 });

        expect(patched.type).to.equal('INVALID_NAME');
        expect(patched.message).to.deep.equal('"name" must be a string');
      });
      it('schema validation - invalid length of "name"', async function () {
        const patched = await productsService.putProduct(1, { name: 'ko' });

        expect(patched.type).to.equal('INVALID_NAME');
        expect(patched.message).to.deep.equal('"name" length must be at least 5 characters long');
      });
      it('productId not found', async function () {
        sinon.stub(productsModel, 'findById').resolves(undefined);
        const patched = await productsService.putProduct(1, { name: 'Not Found' });

        expect(patched.type).to.equal('PRODUCT_NOT_FOUND');
        expect(patched.message).to.deep.equal('Product not found');
      });
    });
  });
  afterEach(function () { sinon.restore(); });
});