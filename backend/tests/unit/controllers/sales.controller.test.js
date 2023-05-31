const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const mock = require('./mocks/sales.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('01 - SALES - CONTROLLER', function () {
  describe('GET "/"', function () {
    it('Should call status 200, and json with the list on Success', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales')
        .resolves({ type: null, message: mock.resAll.message });

      await salesController.viewSalesList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mock.resAll.message);
    });
  });

  describe('GET "/:id"', function () {
    it('On sucess call status 200, and json with the product', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById')
        .resolves({ type: null, message: mock.listIdMessage });

      await salesController.viewSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mock.listIdMessage);
    });
    describe('On failure', function () {
      it('call status 404, and json with the message', async function () {
        const res = {};
        const req = {
          params: { id: 1 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSalesById')
          .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

        await salesController.viewSaleById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      });
      
      it('call status 500, and json with the message', async function () {
        const res = {};
        const req = {
          params: { id: 'A' },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        await salesController.viewSaleById(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
      });
    });

    describe('POST "/"', function () {
      it('On succes - call status 201, and json with the id and product(s)', async function () {
        const res = {};
        const req = {
          body: mock.requestInsertSale,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'postSale')
        .resolves({ type: null, message: mock.responseInsertSale });
        
        await salesController.insertSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(mock.responseInsertSale);
      });

      it('On failure - call status 422 with accordingly message', async function () {
        const res = {};
        const req = {
          body: mock.badRequestAInsertSale,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'postSale')
        .resolves({ type: 'INVALID_SALE' });
        
        await salesController.insertSale(req, res);

        expect(res.status).to.have.been.calledWith(422);
      });

      it('On failure - call status 404 with accordingly message', async function () {
        const res = {};
        const req = {
          body: mock.badRequestAInsertSale,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'postSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND' });
        
        await salesController.insertSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
      });
    });
  });

  describe('DELETE "/:id"', function () {
    it('On success - call status 204', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: null, message: '' });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
    describe('On failuer', function () {
      it('calls 422 on invalid ID', async function () {
        const res = {};
        const req = {
          params: { id: '2' },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'deleteSale')
          .resolves({ type: 'INVALID_ID', message: '"id" must be a number' });

        await salesController.removeSale(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
      });

      it('call 404 on id not found', async function () {
        const res = {};
        const req = {
          params: { id: 2 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'deleteSale')
          .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

        await salesController.removeSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });
  });
  afterEach(function () { sinon.restore(); });
});