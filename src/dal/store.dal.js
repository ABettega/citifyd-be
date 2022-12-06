/* eslint-disable camelcase */
const sql = require('./database');

const listStoresDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        s.store_name as "storeName",
        s.store_fee as "storeFee"
      FROM store s;
    `;

    return queryResult;
  } catch (error) {
    throw new Error(error);
  }
};

const createStoreDal = async ({
  name,
  fee,
}) => {
  try {
    await sql`
      INSERT INTO store
      (
        store_name, store_fee
      )
      VALUES
      (
        ${name}, ${fee}
      );
    `;

    return {
      success: true,
      message: 'Store created successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updateStoreDal = async ({
  storeId,
  name,
  fee,
}) => {
  try {
    const validIdResult = await sql`
      SELECT id
      FROM store
      WHERE id = ${storeId};
    `;

    if (!validIdResult) {
      return {
        success: false,
        message: 'The specified store does not exist!',
      };
    }

    const storeObject = {
      ...(name ? { store_name: name } : {}),
      ...(fee ? { store_fee: fee } : {}),
    };

    await sql`
      UPDATE store s
      SET ${sql(storeObject)}
      WHERE s.id = ${storeId};
    `;

    return {
      success: true,
      message: 'Store updated successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listStoresDal,
  createStoreDal,
  updateStoreDal,
};
