const sql = require('../dal/database');
const {
  listStoresService,
  createStoreService,
  updateStoreService,
} = require('../service/store.service');

describe('List Store Service', () => {
  test('returns a list of stores', async () => {
    const data = await listStoresService();
    expect(data.success).toBe(true);
  });
});

describe('Create Store Service', () => {
  test('successfully creates a store', async () => {
    const data = await createStoreService({
      name: 'Test store',
      fee: 10,
    });
    expect(data.success).toBe(true);
  });

  test('fails when not specifying a name', async () => {
    const data = await createStoreService({
      fee: 10,
    });
    expect(data.success).toBe(false);
  });

  test('fails when not specifying a fee', async () => {
    const data = await createStoreService({
      name: 'Test store',
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string for the fee', async () => {
    const data = await createStoreService({
      name: 'Test store',
      fee: '10',
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative for the value', async () => {
    const data = await createStoreService({
      name: 'Test store',
      fee: -10,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a fee above 100', async () => {
    const data = await createStoreService({
      name: 'Test store',
      fee: 101,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a fee below 1', async () => {
    const data = await createStoreService({
      name: 'Test store',
      fee: 0,
    });
    expect(data.success).toBe(false);
  });
});

describe('Update Product Service', () => {
  test('successfully updates a store when specifying all data', async () => {
    const data = await updateStoreService({
      name: 'Test store',
      fee: 10,
      storeId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('successfully updates a product when not specifying the name', async () => {
    const data = await updateStoreService({
      fee: 10,
      storeId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('successfully updates a product when not specifying the name', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      storeId: 1,
    });
    expect(data.success).toBe(true);
  });

  test('fails when not specifying a store', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      fee: 10,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a string for the store ID', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      fee: 10,
      storeId: '1',
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative for the fee', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      fee: -10,
      storeId: 1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a negative ID for the store', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      fee: 10,
      storeId: -1,
    });
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing store', async () => {
    const data = await updateStoreService({
      name: 'Test product',
      fee: 10,
      storeId: 100,
    });
    expect(data.success).toBe(false);
  });
});

afterAll(async () => {
  sql.end();
});
