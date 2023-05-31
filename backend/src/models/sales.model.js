const cc = require('camelcase');
const { connection } = require('./connection');
const productsModel = require('./products.model');

const dateById = async (saleId) => {
  const [[date]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [saleId]);
  
  return date;
};

const parseIds = async (sale, bool) => {
  const camelized = Object.fromEntries(Object.keys(sale)
    .map((key, index) => [cc(key), Object.values(sale)[index]]));
  const { saleId, productId, quantity } = camelized;

  const { date } = await dateById(saleId);
  const parsed = bool ? { productId, quantity, date } : { ...camelized, date };
  return parsed;
};

const findAll = async () => {
  const [list] = await connection.execute(
    'SELECT * FROM sales_products ORDER BY sale_id, product_id;',
  );
  const parsedSales = Promise.all(list.map((sale) => parseIds(sale, false)));
  return parsedSales;
};

const findById = async (saleId) => {
  const [sales] = await connection
    .execute('SELECT * FROM sales_products WHERE sale_id  = ?', [saleId]);
  const parsedSales = Promise.all(sales.map((sale) => parseIds(sale, true)));
  return parsedSales;
};

const insertTimestamp = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)');
  return insertId;
};

const registerQuantitySold = async (relation, saleId) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, relation.productId, relation.quantity],
  );
};

const insertSale = async (items) => {
  const checkIds = await Promise
    .all(items.map((item) => productsModel.findById(item.productId)));
  const isUnd = checkIds.some((item) => item === undefined);

  if (isUnd) return undefined;
  
  const saleId = await insertTimestamp();

  await Promise.all(items.map((item) => registerQuantitySold(item, saleId)));
  const getItemsSold = await findById(saleId);
  const itemsSold = await Promise
    .all(getItemsSold.map((item) => ({ productId: item.productId, quantity: item.quantity })));
  return { id: saleId, itemsSold };
};

const remove = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = (?)',
    [saleId],
  );
  return affectedRows;
};

const updateProductQuantity = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE sales_products SET quantity = (?) WHERE sale_id = (?) AND product_id = (?)',
    [quantity, saleId, productId],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insertSale,
  dateById,
  remove,
  updateProductQuantity,
};