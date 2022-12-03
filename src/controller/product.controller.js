const { auditLog } = require('../util/logger');
const {
  listProductsService,
  createProductService,
  // updateStoreService,
} = require('../service/product.service');

/**
 * @description
 * Lists all existing products in the marketplace.
 *
 * @returns {String[]} The existing list of stores.
 */
const listProducts = async (req, res) => {
  try {
    const productList = await listProductsService();

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
    } = req.body;

    if (
      !name
      || !value
      || value < 0
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const productCreationResult = await createProductService({ name, value });

    if (productCreationResult.success) {
      auditLog({
        message: `A new product has been created in the database, named ${name}, with a value of $${value}!`,
        location: 'POST /v1/product',
        severity: 'INFO',
      });
      res.status(200).json('Product inserted successfully!');
    } else {
      auditLog({
        message: `There was an attempt to create a new product, but it failed! Error: ${productCreationResult.message}`,
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
  createProduct,
};
