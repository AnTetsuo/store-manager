const { connection } = require('./connection');

const findAll = async () => {
  const [list] = await connection.execute('SELECT * FROM products');
  
  return list;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product.name],
  );

  return insertId;
};

const putProductInfo = async (productId, productInfo) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = (?) WHERE id = (?)',
    [productInfo.name, productId],
    );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  putProductInfo,
};