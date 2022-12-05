// Imports
const express = require('express');

// Controller
const {
  listInactiveProducts,
  listProducts,
  createProduct,
  // updateStore,
} = require('../controller/product.controller');

// Router
const router = express.Router();

// Routes
router.get('/inactive', (req, res) => listInactiveProducts(req, res));
router.get('/:storeId', (req, res) => listProducts(req, res));
router.post('/', (req, res) => createProduct(req, res));
// router.put('/', (req, res) => updateStore(req, res));

module.exports = router;
