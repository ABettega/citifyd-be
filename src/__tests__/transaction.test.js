const sql = require('../dal/database');
const {
  // listStoresService,
  createTransactionService,
  getTransactionDetailsService,
  listTransactionsService,
  // updateStoreService,
} = require('../service/transaction.service');

// describe('Get Transaction Details Service', () => {
//   test('returns the details of a transaction when specifying a valid product ID', async () => {
//     const data = await getTransactionDetailsService(4);
//     expect(data.success).toBe(true);
//   });

//   test('fails when specifying a negative product ID', async () => {
//     const data = await getTransactionDetailsService(-4);
//     expect(data.success).toBe(false);
//   });

//   test('fails when specifying a string as product ID', async () => {
//     const data = await getTransactionDetailsService('4');
//     expect(data.success).toBe(false);
//   });

//   test('fails when specifying an invalid value as product ID', async () => {
//     const data = await getTransactionDetailsService(4.1);
//     expect(data.success).toBe(false);
//   });

//   test('returns the correct sum of all fees', async () => {
//     const data = await getTransactionDetailsService(4);
//     const {
//       valueFull,
//       valueStore,
//       valueMarketplace,
//       valuePayGateway,
//     } = data.transactionDetails;
//     expect(valuePayGateway + valueStore + valueMarketplace).toBe(valueFull);
//   });

//   test('returns a value of 1% for the Pay Gateway fee', async () => {
//     const data = await getTransactionDetailsService(4);
//     const {
//       valueFull,
//       valuePayGateway,
//     } = data.transactionDetails;
//     expect(valuePayGateway).toBe(valueFull / 100);
//   });
// });

// describe('Create Transaction Service', () => {
//   test('successfully creates a transaction when specifying a valid product ID', async () => {
//     const transactionDetailsResponse = await getTransactionDetailsService(4);
//     const data = await createTransactionService(transactionDetailsResponse.transactionDetails);
//     expect(data.success).toBe(true);
//   });
// });

describe('List Transaction Service', () => {
  test('returns a list of transactions for all stores', async () => {
    const data = await listTransactionsService();
    expect(data.success).toBe(true);
  });

  test('returns a list of transactions when specifying a store', async () => {
    const data = await listTransactionsService(1);
    expect(data.success).toBe(true);
  });

  test('fails when specifying a negative store ID', async () => {
    const data = await listTransactionsService(-1);
    expect(data.success).toBe(false);
  });

  test('fails when specifying an invalid value as store ID', async () => {
    const data = await listTransactionsService(1.1);
    expect(data.success).toBe(false);
  });

  test('fails when specifying a non-existing store ID', async () => {
    const data = await listTransactionsService(100);
    expect(data.success).toBe(false);
  });
});

afterAll(async () => {
  sql.end();
});
