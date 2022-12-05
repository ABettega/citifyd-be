const sql = require('./database');

const listTransactionsDal = async (storeId) => {
  try {
    const specifiedStoreQuery = (id) => sql`WHERE t.store_id = ${id}`;

    const queryResult = await sql`
      SELECT
        t.id,
        t.store_id,
        t.product_id,
        t.product_name_at_transaction,
        t.value_full,
        t.value_store,
        t.value_marketplace,
        t.value_pay_gateway,
        t.transaction_date
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
        p.id = ${productId}
        AND p.product_active = TRUE;
    `;

    if (!validProductIdResult) {
      return false;
    }

    const queryResult = await sql`
      SELECT
        p.product_name,
        p.product_value,
        p.store_id,
        s.store_fee
      FROM product p
      JOIN store s
        ON s.id = p.store_id
      WHERE 
        p.product_active = TRUE
        AND p.id = ${productId};
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
