const {
  listTransactionsDal,
  getProductAndStoreInformationDal,
  createTransactionDal,
} = require('../dal/transaction.dal');

const { transactionCalculator } = require('../util/helper');

const listTransactionsService = async (storeId) => {
  try {
    const transactionList = await listTransactionsDal(storeId);

    return {
      success: true,
      entries: transactionList.length,
      transactionList,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createTransactionService = async (productId) => {
  try {
    const productAndStoreInformation = await getProductAndStoreInformationDal(productId);

    const {
      product_name: productName,
      product_value: productValue,
      store_id: storeId,
      store_fee: storeFee,
    } = productAndStoreInformation;

    const {
      valueFull,
      valueStore,
      valueMarketplace,
      valuePayGateway,
    } = transactionCalculator({ productValue, storeFee });

    const transactionDetails = {
      storeId,
      productId,
      productName,
      valueFull,
      valueStore,
      valueMarketplace,
      valuePayGateway,
    };

    const transactionCreationResult = await createTransactionDal(transactionDetails);

    if (!transactionCreationResult) {
      return {
        success: false,
        message: 'Transaction not successful!',
      };
    }

    return {
      success: true,
      message: 'Transaction successful!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listTransactionsService,
  createTransactionService,
};
