const sql = require('./database');

const listProductsDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        p.product_name as productName,
        p.product_value as productValue,
        p.product_active as productStatus
      FROM product p;
    `;

    return {
      success: true,
      entries: queryResult.length,
      products: queryResult,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createProductDal = async ({
  name,
  value,
}) => {
  try {
    await sql`
      INSERT INTO product
      (
        product_name, product_value, product_active
      )
      VALUES
      (
        ${name}, ${value}, TRUE
      );
    `;

    return {
      success: true,
      message: 'Product created successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsDal,
  createProductDal,
};
