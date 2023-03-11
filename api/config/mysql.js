const { createPool } = require('mysql');

const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  connectionLimit: 10,
  database: 'test',
});

module.exports = pool;
