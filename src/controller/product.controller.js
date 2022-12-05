const { auditLog } = require('../util/logger');
const {
  listProductsService,
  listInactiveProductsService,
  createProductService,
  // updateStoreService,
} = require('../service/product.service');

/**
 * @param {string} store - The ID for which store you want the products. Required.
 *
 * @description
 * Lists all existing and active products in the specified store.
 *
 * @returns {String[]} The existing list of products.
 */
const listProducts = async (req, res) => {
  try {
    const {
      storeId,
    } = req.params;

    if (
      !storeId
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const productList = await listProductsService(storeId);

    res.status(200).json(productList);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'GET /v1/product',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @description
 * Lists all inactive products in the marketplace.
 *
 * @returns {String[]} The existing list of inactive products.
 */
const listInactiveProducts = async (req, res) => {
  try {
    const inactiveProductList = await listInactiveProductsService();

    res.status(200).json(inactiveProductList);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'GET /v1/product/inactive',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} name - The name for the product being created. Required.
 * @param {string} value - The value for that particular product. Required.
 * Only positive values are allowed.
 *
 * @description
 * Creates a new product with the specified name and value.
 *
 * @returns {String} A message confirming the product creation.
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      value,
      storeId,
    } = req.body;

    if (
      !name
      || !storeId
      || !value
      || value < 0
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const productCreationResult = await createProductService({ name, value, storeId });

    if (productCreationResult.success) {
      auditLog({
        message: `A new product has been created in the database for store ${storeId}, named ${name}, with a value of $${value}!`,
        location: 'POST /v1/product',
        severity: 'INFO',
      });
      res.status(200).json('Product inserted successfully!');
    } else {
      auditLog({
        message: `There was an attempt to create a new product for store ${storeId}, but it failed! Error: ${productCreationResult.message}`,
        location: 'POST /v1/product',
        severity: 'WARN',
      });
      res.status(400).json(productCreationResult.message);
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'POST /v1/product',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  listProducts,
  listInactiveProducts,
  createProduct,
};
