// Imports
const express = require('express');

// Controller
const {
  listTransactions,
  createTransaction,
} = require('../controller/transaction.controller');

// Router
const router = express.Router();

// Routes
router.get('/', (req, res) => listTransactions(req, res));
router.get('/:storeId', (req, res) => listTransactions(req, res));
router.post('/', (req, res) => createTransaction(req, res));

module.exports = router;
