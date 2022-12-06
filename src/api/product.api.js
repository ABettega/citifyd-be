// Imports
const express = require('express');

// Controller
const {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controller/product.controller');

// Router
const router = express.Router();

// Routes
router.get('/:storeId', (req, res) => listProducts(req, res));
router.post('/', (req, res) => createProduct(req, res));
router.delete('/:productId', (req, res) => deleteProduct(req, res));
router.put('/', (req, res) => updateProduct(req, res));

module.exports = router;
