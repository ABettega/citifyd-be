const morgan = require('morgan');
const express = require('express');

const storeApi = require('./api/store.api');
// const userApi = require('./api/user.api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/store', storeApi);
// app.use('/v1/user', userApi);

app.listen(3000, () => console.log('The server is up on PORT 3000'));
