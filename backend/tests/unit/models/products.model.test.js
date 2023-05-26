const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { connection } = require('../../../src/models/connection');
const mocked = require('./mocks/product.model.mock');

describe('00 - PRODUCTS - MODEL', function () {
  describe('GET "/"', function () {
    it('Returns a list with all products', async function () {
      sinon.stub(connection, 'execute').resolves([mocked.productList]);

      const result = await productsModel.findAll();

      expect(result).to.be.deep.equal(mocked.productList);
    }); 
  });

  describe('GET /:id', function () {
    it('Return a product object with "id" and "name"', async function () {
      sinon.stub(connection, 'execute').resolves([[mocked.productList[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal(mocked.productList[0]);
    });
    it('If not found returns undefined"', async function () {
      sinon.stub(connection, 'execute').resolves([[undefined]]);

      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal(undefined);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});