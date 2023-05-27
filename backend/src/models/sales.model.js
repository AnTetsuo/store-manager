const cc = require('camelcase');
const { connection } = require('./connection');

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

module.exports = {
  findAll,
  findById,
};