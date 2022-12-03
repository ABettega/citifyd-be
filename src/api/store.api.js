// Imports
const express = require('express');

// Controller
const {
  listStores,
  createStore,
  updateStore,
} = require('../controller/store.controller');

// Router
const router = express.Router();

// Routes
router.get('/', (req, res) => listStores(req, res));
router.post('/', (req, res) => createStore(req, res));
router.put('/', (req, res) => updateStore(req, res));

module.exports = router;
