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
        p.product_value as "productValue"
      FROM product p
      WHERE
        p.store_id = ${storeId};
      ;
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
        product_name, product_value, store_id
      )
      VALUES
      (
        ${name}, ${value}, ${storeId}
      );
    `;

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProductDal = async (productId) => {
  try {
    const validProductIdResult = await sql`
      SELECT p.id
      FROM product p
      WHERE p.id = ${productId};
    `;

    if (validProductIdResult.length === 0) {
      return false;
    }

    await sql`
      DELETE FROM product p
      WHERE p.id = ${productId};
    `;

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductDal = async ({
  productId,
  name,
  value,
}) => {
  try {
    const validIdResult = await sql`
      SELECT id
      FROM product
      WHERE id = ${productId};
    `;

    if (!validIdResult) {
      return {
        success: false,
        message: 'The specified product does not exist!',
      };
    }

    const productObject = {
      ...(name ? { product_name: name } : {}),
      ...(value ? { product_value: value } : {}),
    };

    await sql`
      UPDATE product p
      SET ${sql(productObject)}
      WHERE p.id = ${productId};
    `;

    return {
      success: true,
      message: 'Product updated successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsDal,
  createProductDal,
  deleteProductDal,
  updateProductDal,
};
