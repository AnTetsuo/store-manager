const listAll = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const listById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const requestInsertSale = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const invalidIdRequestInsertSale = [
  {
    productId: 'a',
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const invalidQuantityRequestInsertSale = [
  {
    productId: 2,
    quantity: 'a',
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const responseInsertSale = {
  id: 1,
  itemsSold: requestInsertSale,
};

module.exports = {
  listAll,
  listById,
  requestInsertSale,
  responseInsertSale,
  invalidIdRequestInsertSale,
  invalidQuantityRequestInsertSale,
};