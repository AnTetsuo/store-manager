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
    describe('On failure', function () {
      it('call status 404, and json with the message', async function () {
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
      
      it('call status 500, and json with the message', async function () {
        const res = {};
        const req = {
          params: { id: 'A' },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        await productsController.viewProductById(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
      });
    });

    describe('POST "/"', function () {
      it('On success - call status 201, and json with the product on Success', async function () {
        const prep = { productId: 1, name: 'Axe"s Axe' };
        const res = {};
        const req = {
          body: {
            name: 'Axe"s Axe',
          },
        };
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'addProduct')
          .resolves({ type: null, message: prep });
  
        await productsController.insertProduct(req, res);
  
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(prep);
      });

      it('On failure - call status 500, and json with the message', async function () {
        const res = {};
        const req = {
          body: { name: 123 },
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        await productsController.insertProduct(req, res);
  
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' });
      });
    });
  });

  describe('PUT "/:id"', function () {
    it('On success - call status 200 and json with the product', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'valid Name' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'putProduct')
      .resolves({ type: null, message: { id: 1, name: 'valid Name' } });
      
      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'valid Name' });
    });
    it('On failure - calls the status with the accordingly error', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 123 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' });
    });
  });

  describe('DELETE "/:id"', function () {
    it('On success - calls status 201 and json without args', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'removeProduct')
      .resolves({ type: null, message: '' });
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
    it('On failure - calls status and message accordingly', async function () {
      const res = {};
      const req = {
        params: { id: 'invalidId' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
  });
  afterEach(function () { sinon.restore(); });
});