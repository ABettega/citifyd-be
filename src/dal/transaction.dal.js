const sql = require('./database');

const listTransactionsDal = async (storeId) => {
  try {
    const specifiedStoreQuery = (id) => sql`WHERE t.store_id = ${id}`;

    const queryResult = await sql`
      SELECT
        t.id as "transactionId",
        t.store_id as "storeId",
        t.product_id as "productId",
        t.product_name_at_transaction as "productNameAtTransaction",
        t.value_full as "pricePaid",
        t.value_store as "valueStore",
        t.value_marketplace as "valueMarketplace",
        t.value_pay_gateway as "valuePayGateway",
        t.transaction_date as "transactionDate"
      FROM transaction t
      ${storeId ? specifiedStoreQuery(storeId) : sql``};
    `;

    return queryResult;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductAndStoreInformationDal = async (productId) => {
  try {
    const validProductIdResult = await sql`
      SELECT p.id
      FROM product p
      WHERE
        p.id = ${productId};
    `;

    if (!validProductIdResult) {
      return false;
    }

    const queryResult = await sql`
      SELECT
        p.product_name as "productName",
        p.product_value as "productValue",
        p.store_id as "storeId",
        s.store_fee as "storeFee"
      FROM product p
      JOIN store s
        ON s.id = p.store_id
      WHERE p.id = ${productId};
    `;

    return queryResult?.[0];
  } catch (error) {
    throw new Error(error);
  }
};

const createTransactionDal = async ({
  storeId,
  productId,
  productName,
  valueFull,
  valueStore,
  valueMarketplace,
  valuePayGateway,
}) => {
  try {
    const transactionInsertResult = await sql`
      INSERT INTO transaction
      (
        store_id, product_id, product_name_at_transaction,
        value_full, value_store, value_marketplace,
        value_pay_gateway, transaction_date
      )
      VALUES
      (
        ${storeId}, ${productId}, ${productName},
        ${valueFull}, ${valueStore}, ${valueMarketplace},
        ${valuePayGateway}, NOW()::timestamp
      );
    `;

    return transactionInsertResult;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listTransactionsDal,
  getProductAndStoreInformationDal,
  createTransactionDal,
};
