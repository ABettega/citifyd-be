const {
  listProductsDal,
  createProductDal,
  deleteProductDal,
  updateProductDal,
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

    const fixedProductList = productList.map((product) => {
      const fixedProduct = { ...product };
      fixedProduct.productValue /= 100;
      return fixedProduct;
    });

    return {
      success: true,
      entries: fixedProductList.length,
      products: fixedProductList,
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
    const valueInCents = Math.round(value * 100);

    const productCreationResult = await createProductDal({
      name,
      value: valueInCents,
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

const deleteProductService = async (productId) => {
  try {
    const productDeletionResult = await deleteProductDal(productId);

    return productDeletionResult ? {
      success: true,
      message: 'Product deleted successfully!',
    } : {
      success: false,
      message: 'Specified product does not exist!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductService = async ({
  productId,
  name,
  value,
}) => {
  try {
    const valueInCents = Math.round(value * 100);

    const productUpdateResult = await updateProductDal({
      productId,
      name,
      value: valueInCents,
    });

    return {
      success: productUpdateResult.success,
      message: productUpdateResult.message,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listProductsService,
  createProductService,
  deleteProductService,
  updateProductService,
};
