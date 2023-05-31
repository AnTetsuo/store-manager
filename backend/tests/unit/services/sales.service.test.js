const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const prodMock = require('./mocks/product.service.mock');
const mock = require('./mocks/sales.service.mock');

const serverErr = 'Internal server error';

describe('01 - SALES - SERVICE', function () {
  describe('GET "/"', function () {
    it('Returns an object with type "null" and a message with the sales list', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mock.listAll);

      const result = await salesService.getSales();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.listAll);
    });
    it('It returns type and message informing the server error if DB fails', async function () {
      sinon.stub(salesModel, 'findAll').resolves().throws();

      const result = await salesService.getSales();

      expect(result.type).to.equal('INTERNAL_SERVER_ERROR');
      expect(result.message).to.deep.equal(serverErr);
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

        expect(result.type).to.equal('INVALID_ID');
        expect(result.message).to.deep.equal('"id" must be a number');
      });

      it('It returns type and message informing the server error if DB fails', async function () {
        sinon.stub(salesModel, 'findById').resolves().throws();
  
        const result = await salesService.getSalesById(1);
  
        expect(result.type).to.equal('INTERNAL_SERVER_ERROR');
        expect(result.message).to.deep.equal(serverErr);
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
      it('With product not found if productId is not found', async function () {
        const prod = sinon.stub(productsModel, 'findById');
        prod.onFirstCall().resolves(undefined);
        prod.onSecondCall().resolves(undefined);

        const result = await salesService.postSale(mock.requestInsertSale);

        expect(result.type).to.equal('PRODUCT_NOT_FOUND');
        expect(result.message).to.deep.equal('Product not found');
      });
      it('It returns type and message informing the server error if DB fails', async function () {
        sinon.stub(salesModel, 'findById').resolves().throws();
  
        const result = await salesService.postSale(mock.requestInsertSale);
  
        expect(result.type).to.equal('INTERNAL_SERVER_ERROR');
        expect(result.message).to.deep.equal(serverErr);
      });
    });
  });

  describe('DELETE "/:id"', function () {
    it('On success returns type null', async function () {
      sinon.stub(salesModel, 'dateById').resolves([[{ date: 'something true' }]]);
      sinon.stub(salesModel, 'remove').resolves([{ affectedRows: 1 }]);

      const result = await salesService.deleteSale(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    });

    it('On an invalid Id returns invalidID type', async function () {
      const result = await salesService.deleteSale('a');

      expect(result.type).to.equal('INVALID_ID');
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('If id not found return not found type', async function () {
      sinon.stub(salesModel, 'dateById').resolves(undefined);

      const result = await salesService.deleteSale(1);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
    it('On db error it throws and returns type and message accordingly', async function () {
      sinon.stub(salesModel, 'findById').resolves().throws();

      const result = await salesService.deleteSale(1);

      expect(result.type).to.equal('INTERNAL_SERVER_ERROR');
      expect(result.message).to.deep.equal(serverErr);
    });
  });

  describe('PUT "/:saleId/products/:productId/quantity"', function () {
    it('On success - returns type null, and message with the updated qunatity', async function () {
      sinon.stub(salesModel, 'dateById').resolves({ date: 1 });
      sinon.stub(salesModel, 'findById').resolves(mock.listById);
      sinon.stub(salesModel, 'updateProductQuantity').resolves(1);

      const result = await salesService.updateProductQuantity(1, 1, 10);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mock.listById[0]);
    });

    describe('On failure', function () {
      it('ProductId not in relation with saleId', async function () {
        sinon.stub(salesModel, 'dateById').resolves({ date: 1 });
        sinon.stub(salesModel, 'findById').resolves(mock.listById);

        const result = await salesService.updateProductQuantity(1, 140, 10);

        expect(result.type).to.equal('PRODUCT_NOT_IN_SALE');
        expect(result.message).to.deep.equal('Product not found in sale');
      });
      
      it('If called with invalid params returns type with error', async function () {
        const result = await salesService.updateProductQuantity('a', 1, 2);
        
        expect(result.type).to.equal('INVALID_UPDATE_INFO');
        expect(result.message).to.deep.equal('"saleId" must be a number');
      });

      it('If sale is not found', async function () {
        sinon.stub(salesModel, 'dateById').resolves(undefined);

        const result = await salesService.updateProductQuantity(1, 2, 3);

        expect(result.type).to.equal('SALE_NOT_FOUND');
        expect(result.message).to.deep.equal('Sale not found');
      });
      it('If connection with DB fails', async function () {
        sinon.stub(salesModel, 'dateById').resolves().throws();

        const result = await salesService.updateProductQuantity(1, 1, 1);

        expect(result.type).to.equal('INTERNAL_SERVER_ERROR');
        expect(result.message).to.deep.equal(serverErr);
      });
    });
  });
  afterEach(function () { sinon.restore(); });
});