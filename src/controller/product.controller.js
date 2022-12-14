const { auditLog } = require('../util/logger');
const { checkForInvalidInteger } = require('../util/helper');
const {
  listProductsService,
  createProductService,
  deleteProductService,
  updateProductService,
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

    const numericStoreId = parseInt(storeId, 10);

    const productList = await listProductsService(numericStoreId);

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
      || checkForInvalidInteger(storeId)
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

/**
 * @param {string} name - The new name for the specified product
 * @param {string} value - The new value for the specified product
 * @param {number} productId - The ID for the product being updated
 *
 * @description
 * Updates an existing product based on the ID.
 *
 * @returns {String} A message confirming the product update.
 */
const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      value,
    } = req.body;

    if (
      !productId
      || (!name && !value)
      || checkForInvalidInteger(productId)
      || (value !== undefined && typeof (value) !== 'number')
      || value < 0
    ) {
      res.status(400).json({
        success: false,
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const productUpdateResult = await updateProductService({ productId, name, value });

    if (productUpdateResult.success) {
      auditLog({
        message: `The product with ID ${productId} has been updated! The changes are ${JSON.stringify({ name, value })}!`,
        location: 'PUT /v1/product',
        severity: 'INFO',
      });
      res.status(200).json({
        success: true,
        message: productUpdateResult.message,
      });
    } else {
      auditLog({
        message: `There was an attempt to update the product with ID ${productId}, but an error occurred! Error: ${productUpdateResult.message}`,
        location: 'PUT /v1/product',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: productUpdateResult.message,
      });
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'PUT /v1/product',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
