/* eslint-disable camelcase */
const { checkForInvalidInteger } = require('../util/helper');
const sql = require('./database');

const listStoresDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        s.id as "storeId",
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
    if (
      !name
      || !fee
      || typeof (fee) !== 'number'
      || fee < 1
      || fee > 100
    ) {
      return {
        success: false,
        message: 'Invalid or missing values!',
      };
    }

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
    if (
      checkForInvalidInteger(storeId)
      || (!name && !fee)
      || (fee && (
        typeof (fee) !== 'number'
        || fee < 1
        || fee > 100
      ))
    ) {
      return {
        success: false,
        message: 'Invalid or missing values!',
      };
    }

    const validIdResult = await sql`
      SELECT id
      FROM store
      WHERE id = ${storeId};
    `;

    if (!validIdResult || validIdResult.length === 0) {
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
