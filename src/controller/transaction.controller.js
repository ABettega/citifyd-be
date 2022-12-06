const { auditLog } = require('../util/logger');
const {
  listTransactionsService,
  createTransactionService,
  getTransactionDetailsService,
} = require('../service/transaction.service');

/**
 * @param {string} store - The ID for which store you want the transactions. Not required.

* @description
 * Lists all transactions done in the marketplace for a specific store.
 *
 * @returns {String[]} The list of transactions done for the specified store.
 */
const listTransactions = async (req, res) => {
  try {
    const {
      storeId,
    } = req.params;

    const transactionList = await listTransactionsService(storeId);

    res.status(200).json(transactionList);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'GET /v1/transaction',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} productId - The ID for the product being bought. Required.
 *
 * @description
 * Makes a transaction for the specified product.
 *
 * @returns {String} A message confirming the product purchase.
 */
const createTransaction = async (req, res) => {
  try {
    const {
      productId,
    } = req.body;

    if (
      !productId
      || typeof (productId) !== 'number'
    ) {
      res.status(400).json({
        success: false,
        message: 'Malformed request - Parameter(s) missing or invalid',
      });
      return;
    }

    const transactionDetailsResult = await getTransactionDetailsService(productId);

    if (!transactionDetailsResult.success) {
      auditLog({
        message: `There was an attempt to fetch the transaction details, but it failed! Error: ${transactionDetailsResult.message}`,
        location: 'POST /v1/transaction',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: transactionDetailsResult.message,
      });
      return;
    }

    const { transactionDetails } = transactionDetailsResult;
    const transactionCreationResult = await createTransactionService(transactionDetails);

    if (transactionCreationResult.success) {
      auditLog({
        message: `A new transaction has been made in the database, for product ${productId}!`,
        location: 'POST /v1/transaction',
        severity: 'INFO',
      });
      res.status(200).json({
        success: true,
        message: 'Transaction successful!',
      });
    } else {
      auditLog({
        message: `There was an attempt to create a new transaction, but it failed! Error: ${transactionCreationResult.message}`,
        location: 'POST /v1/transaction',
        severity: 'WARN',
      });
      res.status(400).json({
        success: false,
        message: transactionCreationResult.message,
      });
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'POST /v1/transaction',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  listTransactions,
  createTransaction,
};
