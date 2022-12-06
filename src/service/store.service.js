const {
  listStoresDal,
  createStoreDal,
  updateStoreDal,
} = require('../dal/store.dal');

const listStoresService = async () => {
  try {
    const storeList = await listStoresDal();

    return {
      success: true,
      entries: storeList.length,
      storeList,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createStoreService = async ({
  name,
  fee,
}) => {
  try {
    const storeCreationResult = await createStoreDal({
      name,
      fee,
    });

    return storeCreationResult;
  } catch (error) {
    throw new Error(error);
  }
};

const updateStoreService = async ({
  storeId,
  name,
  fee,
}) => {
  try {
    const storeUpdateResult = await updateStoreDal({
      storeId,
      name,
      fee,
    });

    return {
      success: storeUpdateResult.success,
      message: storeUpdateResult.message,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listStoresService,
  createStoreService,
  updateStoreService,
};
