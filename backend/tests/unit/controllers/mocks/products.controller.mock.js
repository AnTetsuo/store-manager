const productList = [
  {
    id: 1,
    productName: 'Kaneda"s Bike',
  },
  {
    id: 2,
    productName: 'Link"s Master Sword',
  },
  {
    id: 3,
    productName: 'Ryu"s Head Band',
  },
];

const listIdMessage = {
  type: null,
  message: productList[0],
};

const listAllMessage = {
  type: null,
  message: productList,
};

module.exports = {
  listIdMessage,
  listAllMessage,
};