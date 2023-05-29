const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const prodMock = require('./mocks/product.service.mock');
const mock = require('./mocks/sales.service.mock');

describe('01 - SALES - SERVICE', function () {
  describe('GET "/"', function () {
    it('Returns an object with type "null" and a message with the sales list', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mock.listAll);

      const result = await salesService.getSales();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.listAll);
    });
  });

  describe('GET "/:id"', function () {
    it('On success - returns an object with type "null", and sale info', async function () {
      sinon.stub(salesModel, 'findById').resolves(mock.listById);

      const result = await salesService.getSalesById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.listById);
    });
    describe('On failure', function () {
      it('returns type "SALE_NOT_FOUND" and accordingly message', async function () {
        sinon.stub(salesModel, 'findById').resolves([]);

        const result = await salesService.getSalesById(1);

        expect(result.type).to.equal('SALE_NOT_FOUND');
        expect(result.message).to.deep.equal('Sale not found');
      });

      it('returns "INVALID_VALUE" if called with anything besides a number', async function () {
        const result = await salesService.getSalesById('not a num');

        expect(result.type).to.equal('INVALID_VALUE');
        expect(result.message).to.deep.equal('"id" must be a integer number');
      });
    });
  });

  describe('POST "/"', function () {
    it('On success - returns type null, and the sale Id with the relation', async function () {
      const prod = sinon.stub(productsModel, 'findById');
      prod.onFirstCall().resolves([[prodMock[0]]]);
      prod.onSecondCall().resolves([[prodMock[1]]]);

      sinon.stub(salesModel, 'insertSale').resolves(mock.responseInsertSale);

      const result = await salesService.postSale(mock.requestInsertSale);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.responseInsertSale);
    });

    describe('On failure', function () {
      it('With a invalid productId', async function () {
        const result = await salesService.postSale(mock.invalidIdRequestInsertSale);

        expect(result.type).to.equal('INVALID_SALE');
        expect(result.message).to.equal('"productId" must be a number');
      });
    });
  });
  afterEach(function () { sinon.restore(); });
});