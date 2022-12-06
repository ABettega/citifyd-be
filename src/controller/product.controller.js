const { auditLog } = require('../util/logger');
const {
  listProductsService,
  createProductService,
  deleteProductService,
  // updateStoreService,
} = require('../service/product.service');

/**
 * @param {string} store - The ID of which store you want the products from. Required.
 *
 * @description
 * Lists all existing products in the specified store.
 *
 * @returns {String[]} The existing list of products for the specified store.
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
        success: false,
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
 * @param {string} name - The name for the product being created. Required.
 * @param {string} value - The value for that particular product. Required.
 * Only positive values are allowed.
 * @param {string} storeId - The ID for the store where the product is being created. Required.
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
      || typeof (storeId) !== 'number'
      || typeof (value) !== 'number'
      || value < 0
    ) {
      res.status(400).json({
        success: false,
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
      res.status(200).json({
        success: true,
        message: 'Product inserted successfully!',
      });
    } else {
      auditLog({
        message: `There was an attempt to create a new product for store ${storeId}, but it failed! Error: ${productCreationResult.message}`,
        location: 'POST /v1/product',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: productCreationResult.message,
      });
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

/**
 * @param {string} productId - The ID for the product being deleted. Required.
 *
 * @description
 * Deletes an existing product.
 *
 * @returns {String} A message confirming the product deletion.
 */
const deleteProduct = async (req, res) => {
  try {
    const {
      productId,
    } = req.params;

    if (
      !productId
    ) {
      res.status(400).json({
        success: false,
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const productDeletionResult = await deleteProductService(productId);

    if (productDeletionResult.success) {
      auditLog({
        message: `Product ${productId} has been deleted from the database!`,
        location: 'DELETE /v1/product',
        severity: 'INFO',
      });
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
      });
    } else {
      auditLog({
        message: `There was an attempt to delete product ${productId}, but it failed! Error: ${productDeletionResult.message}`,
        location: 'POST /v1/product',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: productDeletionResult.message,
      });
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
  deleteProduct,
};
