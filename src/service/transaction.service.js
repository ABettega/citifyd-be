const {
  listTransactionsDal,
  getProductAndStoreInformationDal,
  createTransactionDal,
} = require('../dal/transaction.dal');

const { transactionCalculator } = require('../util/helper');

const listTransactionsService = async (storeId = undefined) => {
  try {
    const transactionList = await listTransactionsDal(storeId);

    if (!transactionList) {
      return {
        success: false,
        message: 'Invalid parameters!',
      };
    }

    return {
      success: true,
      entries: transactionList.length,
      transactionList,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getTransactionDetailsService = async (productId) => {
  try {
    const productAndStoreInformation = await getProductAndStoreInformationDal(productId);

    if (!productAndStoreInformation) {
      return {
        success: false,
        message: 'Error while getting product or store information!',
      };
    }

    const {
      productName,
      productValue,
      storeId,
      storeFee,
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

    return {
      success: true,
      transactionDetails,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createTransactionService = async ({
  storeId,
  productId,
  productName,
  valueFull,
  valueStore,
  valueMarketplace,
  valuePayGateway,
}) => {
  try {
    const transactionCreationResult = await createTransactionDal({
      storeId,
      productId,
      productName,
      valueFull,
      valueStore,
      valueMarketplace,
      valuePayGateway,
    });

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
  getTransactionDetailsService,
  createTransactionService,
};
