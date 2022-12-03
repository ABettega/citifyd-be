const {
  listStoresDal,
  createStoreDal,
  updateStoreDal,
} = require('../dal/store.dal');

const listStoresService = async () => {
  try {
    const storeList = await listStoresDal();

    if (storeList.length === 0) {
      return [];
    }

    return storeList;
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
    return storeUpdateResult;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listStoresService,
  createStoreService,
  updateStoreService,
};
