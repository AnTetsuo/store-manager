const { connection } = require('./connection');

const findAll = async () => {
  const [list] = await connection.execute('SELECT * FROM products');
  
  return list;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  
  return product;
};

module.exports = {
  findAll,
  findById,
};