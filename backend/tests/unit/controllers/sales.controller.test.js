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

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a integer number' });
      });
    });
  });

  afterEach(function () { sinon.restore(); });
});