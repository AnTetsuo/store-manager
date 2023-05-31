const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { connection } = require('../../../src/models/connection');
const mocked = require('./mocks/sales.model.mock');
const prodMock = require('./mocks/product.model.mock');

describe('01 - SALES - MODEL', function () {
  describe('GET "/"', function () {
    it('Returns a list with all sales ordered by saleId -> productId', async function () {
      const query = sinon.stub(connection, 'execute');

      query.onFirstCall().resolves([mocked.salesList]);
      query.onSecondCall().resolves([[{ date: mocked.salesListResponse[0].date }]]);
      query.onThirdCall().resolves([[{ date: mocked.salesListResponse[1].date }]]);

      const result = await salesModel.findAll();

      expect(result).to.deep.equal(mocked.salesListResponse);
    });
  });

  describe('GET "/:id"', function () {
    it('On Success should return an array containing the sale object', async function () {
      const query = sinon.stub(connection, 'execute');

      query.resolves([mocked.salesList]);
      query.onSecondCall().resolves([[{ date: mocked.salesListResponse[0].date }]]);
      query.onThirdCall().resolves([[{ date: mocked.salesListResponse[1].date }]]);

      const result = await salesModel.findById(1);
      
      expect(result).to.deep.equal(mocked.saleIdListResponse);
    });
  });

  describe('POST "/"', function () {
    it('returns an object with id and an array with products', async function () {
      const con = sinon.stub(connection, 'execute');
      const prod = sinon.stub(productsModel, 'findById');

      prod.onFirstCall().resolves([[prodMock.productList[0]]]);
      prod.onSecondCall().resolves([[prodMock.productList[1]]]);
      con.onFirstCall().resolves([{ insertId: 1 }]);
      con.resolves([mocked.saleIdListResponse]);

      const result = await salesModel.insertSale(mocked.insertSale);

      expect(result).to.deep.equal({ id: 1, itemsSold: mocked.insertSale });
    });

    it('returns undefined if any id is not found', async function () {
      const prod = sinon.stub(productsModel, 'findById');
      sinon.stub(salesModel, 'findById').resolves(mocked.saleIdListResponse);
      prod.onFirstCall().resolves(undefined);
      prod.onSecondCall().resolves([[prodMock.productList[1]]]);

      const result = await salesModel.insertSale(mocked.insertSale);
      expect(result).to.be.equal(undefined);
    });
  });

  describe('DELETE "/:id"', function () {
    it('Should return 1', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.remove(1);

      expect(result).to.equal(1);
    });
  });
  afterEach(function () { sinon.restore(); });
});