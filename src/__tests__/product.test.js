const sql = require('../dal/database');
const {
  listProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} = require('../service/product.service');

describe('List Product Service', () => {
  test('returns a list of products when specifying a store', async () => {
    const data = await listProductsService(1);
    expect(data.success).toBe(true);
  });

  test('fails when not specifying a store', async () => {
    const data = await listProductsService(undefined);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string', async () => {
    const data = await listProductsService('1');
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-integer value', async () => {
    const data = await listProductsService(1.1);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative value', async () => {
    const data = await listProductsService(-1);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing store', async () => {
    const data = await listProductsService(100);
    expect(data.success).toBe(false);
  });
});

describe('Create Product Service', () => {
  test('successfully creates a product', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: 10,
      storeId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('fails when not specifying a name', async () => {
    const data = await createProductService({
      value: 10,
      storeId: 1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when not specifying a value', async () => {
    const data = await createProductService({
      name: 'Test product',
      storeId: 1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when not specifying a store', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: 10,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string for the store ID', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: 10,
      storeId: '1',
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative for the value', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: -10,
      storeId: 1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative for the value', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: 10,
      storeId: -1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing store', async () => {
    const data = await createProductService({
      name: 'Test product',
      value: 10,
      storeId: 100,
    });
    expect(data.success).toBe(false);
  });
});

describe('Update Product Service', () => {
  test('successfully updates a product when specifying all data', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: 10,
      productId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('successfully updates a product when not specifying the name', async () => {
    const data = await updateProductService({
      value: 10,
      productId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('successfully updates a product when not specifying the name', async () => {
    const data = await updateProductService({
      name: 'Test product',
      productId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('fails when not specifying a product', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: 10,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string for the product ID', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: 10,
      productId: '1',
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative for the value', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: -10,
      productId: 1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative ID for the product', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: 10,
      productId: -1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing store', async () => {
    const data = await updateProductService({
      name: 'Test product',
      value: 10,
      productId: 100,
    });
    expect(data.success).toBe(false);
  });
});

describe('Delete Product Service', () => {
  test('deletes a product when specifying the ID', async () => {
    const data = await deleteProductService(1);
    expect(data.success).toBe(true);
  });

  test('fails when not specifying the ID', async () => {
    const data = await deleteProductService(undefined);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string', async () => {
    const data = await deleteProductService('1');
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative value', async () => {
    const data = await deleteProductService(-1);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing product', async () => {
    const data = await deleteProductService(100);
    expect(data.success).toBe(false);
  });
});

afterAll(async () => {
  sql.end();
});
