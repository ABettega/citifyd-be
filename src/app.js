const morgan = require('morgan');
const express = require('express');

const storeApi = require('./api/store.api');
const productApi = require('./api/product.api');
const transactionApi = require('./api/transaction.api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/store', storeApi);
app.use('/v1/product', productApi);
app.use('/v1/transaction', transactionApi);

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found!',
  });
});

app.listen(3000, () => console.log('The server is up on PORT 3000'));
