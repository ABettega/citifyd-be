const sql = require('./database');

const listProductsDal = async (storeId) => {
  try {
    const validStoreIdResult = await sql`
      SELECT s.id
      FROM store s
      WHERE s.id = ${storeId};
    `;

    if (validStoreIdResult.length === 0) {
      return false;
    }

    const queryResult = await sql`
      SELECT
        p.id as "productId",
        p.store_id as "storeId",
        p.product_name as "productName",
        p.product_value as "productValue",
        p.product_active as "productActive"
      FROM product p
      WHERE p.store_id = ${storeId};
    `;

    return queryResult;
  } catch (error) {
    throw new Error(error);
  }
};

const listInactiveProductsDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        p.id as "productId",
        p.store_id as "storeId",
        p.product_name as "productName",
        p.product_value as "productValue"
      FROM product p
      WHERE p.product_active = FALSE;
    `;

    return queryResult;
  } catch (error) {
    throw new Error(error);
  }
};

const createProductDal = async ({
  name,
  value,
  storeId,
}) => {
  try {
    const validStoreIdResult = await sql`
      SELECT s.id
      FROM store s
      WHERE s.id = ${storeId};
    `;

    if (validStoreIdResult.length === 0) {
      return false;
    }

    await sql`
      INSERT INTO product
      (
        product_name, product_value, product_active, store_id
      )
      VALUES
      (
        ${name}, ${value}, TRUE, ${storeId}
      );
    `;

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsDal,
  listInactiveProductsDal,
  createProductDal,
};
