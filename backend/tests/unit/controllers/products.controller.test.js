const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const mocked = require('./mocks/products.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('00 - PRODUCTS - CONTROLLER', function () {
  describe('GET "/"', function () {
    it('Should call status 200, and json with the list on Success', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts')
        .resolves({ type: null, message: mocked.listAllMessage });

      await productsController.viewProductsList(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocked.listAllMessage);
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
      sinon.stub(productsService, 'getProductById')
        .resolves({ type: null, message: mocked.listIdMessage });

      await productsController.viewProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocked.listIdMessage);
    });

    it('On failure call status 404, and json with the message', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.viewProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () { sinon.restore(); });
});