const morgan = require('morgan');
const express = require('express');

const storeApi = require('./api/store.api');
const productApi = require('./api/product.api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/store', storeApi);
app.use('/v1/product', productApi);

app.listen(3000, () => console.log('The server is up on PORT 3000'));
