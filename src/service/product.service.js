const {
  listProductsDal,
  createProductDal,
} = require('../dal/product.dal');

const listProductsService = async (storeId) => {
  try {
    const productList = await listProductsDal(storeId);

    if (!productList) {
      return {
        success: false,
        message: 'Specified store does not exist!',
      };
    }

    return {
      success: true,
      storeId,
      entries: productList.length,
      products: productList,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createProductService = async ({
  name,
  value,
  storeId,
}) => {
  try {
    const productCreationResult = await createProductDal({
      name,
      value,
      storeId,
    });

    return productCreationResult ? {
      success: true,
      message: 'Product created successfully!',
    } : {
      success: false,
      message: 'Specified store does not exist!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsService,
  createProductService,
};
