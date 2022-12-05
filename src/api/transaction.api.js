// Imports
const express = require('express');

// Controller
const {
  listTransactions,
  createTransaction,
  // updateStore,
} = require('../controller/transaction.controller');

// Router
const router = express.Router();

// Routes
router.get('/', (req, res) => listTransactions(req, res));
router.get('/:storeId', (req, res) => listTransactions(req, res));
router.post('/', (req, res) => createTransaction(req, res));
// router.put('/', (req, res) => updateStore(req, res));

module.exports = router;
