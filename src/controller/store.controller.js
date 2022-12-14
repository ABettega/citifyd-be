const { auditLog } = require('../util/logger');
const { checkForInvalidInteger } = require('../util/helper');
const {
  listStoresService,
  createStoreService,
  updateStoreService,
} = require('../service/store.service');

/**
 * @description
 * Lists all existing stores in the marketplace.
 *
 * @returns {String[]} The existing list of stores.
 */
const listStores = async (req, res) => {
  try {
    const storeList = await listStoresService();

    res.status(200).json(storeList);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'GET /v1/store',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} name - The name for the store being created. Required.
 * @param {string} fee - The fee for that particular store. Not required. Default value is 0.1.
 * Any value between 0 and 100 is allowed.
 *
 * @description
 * Creates a new store with the specified name and fee.
 *
 * @returns {String} A message confirming the store creation.
 */
const createStore = async (req, res) => {
  try {
    const {
      name,
      fee = 1,
    } = req.body;

    if (
      !name
      || typeof (fee) !== 'number'
      || fee < 1
      || fee > 100
    ) {
      res.status(400).json({
        success: false,
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const storeCreationResult = await createStoreService({ name, fee });

    if (storeCreationResult.success) {
      auditLog({
        message: `A new store has been created in the database, named ${name}, with a fee of ${fee}!`,
        location: 'POST /v1/store',
        severity: 'INFO',
      });
      res.status(200).json({
        success: true,
        message: 'Store inserted successfully!',
      });
    } else {
      auditLog({
        message: `There was an attempt to create a new store, but it failed! Error: ${storeCreationResult.message}`,
        location: 'POST /v1/store',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: storeCreationResult.message,
      });
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'POST /v1/store',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} name - The new name for the specified store
 * @param {string} fee - The new fee for the specified store
 * @param {number} storeId - The ID for the store being updated
 *
 * @description
 * Updates an existing store based on the ID.
 *
 * @returns {String} A message confirming the store update.
 */
const updateStore = async (req, res) => {
  try {
    const {
      storeId,
      name,
      fee,
    } = req.body;

    if (
      !storeId
      || (!name && !fee)
      || checkForInvalidInteger(storeId)
      || (fee !== undefined && (
        typeof (fee) !== 'number'
        || fee < 1
        || fee > 100
      ))
    ) {
      res.status(400).json({
        success: false,
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const storeUpdateResult = await updateStoreService({ storeId, name, fee });

    if (storeUpdateResult.success) {
      auditLog({
        message: `The store with ID ${storeId} has been updated! The changes are ${JSON.stringify({ name, fee })}!`,
        location: 'PUT /v1/store',
        severity: 'INFO',
      });
      res.status(200).json({
        success: true,
        message: storeUpdateResult.message,
      });
    } else {
      auditLog({
        message: `There was an attempt to update the store with ID ${storeId}, but an error occurred! Error: ${storeUpdateResult.message}`,
        location: 'PUT /v1/store',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: storeUpdateResult.message,
      });
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'PUT /v1/store',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  listStores,
  createStore,
  updateStore,
};
