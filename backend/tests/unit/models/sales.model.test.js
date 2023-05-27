const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { connection } = require('../../../src/models/connection');
const mocked = require('./mocks/sales.model.mock');

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

  afterEach(function () { sinon.restore(); });
});