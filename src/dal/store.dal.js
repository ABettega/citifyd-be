const sql = require('./database');

const listStoresDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        s.store_name as storeName,
        s.store_fee as storeFee
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

module.exports = {
  listStoresDal,
  createStoreDal,
};
