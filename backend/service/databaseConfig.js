//databaseConfig.js

const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: config.db_username,
    password: config.db_password,
    database: config.db_database_name,
    multipleStatements: false
});

module.exports = pool;
