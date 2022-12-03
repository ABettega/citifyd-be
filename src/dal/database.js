const postgres = require('postgres');
const dbConfig = require('../config/db');

const sql = postgres(`postgres://${dbConfig.POSTGRES_USER}:${dbConfig.POSTGRES_PASSWORD}@${dbConfig.POSTGRES_HOST}:${dbConfig.POSTGRES_PORT}/${dbConfig.POSTGRES_DB}`);

module.exports = sql;
