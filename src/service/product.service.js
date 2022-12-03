const {
  listProductsDal,
  createProductDal,
} = require('../dal/product.dal');

const listProductsService = async () => {
  try {
    const productList = await listProductsDal();

    return productList;
  } catch (error) {
    throw new Error(error);
  }
};

const createProductService = async ({
  name,
  value,
}) => {
  try {
    const productCreationResult = await createProductDal({
      name,
      value,
    });
    return productCreationResult;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsService,
  createProductService,
};
