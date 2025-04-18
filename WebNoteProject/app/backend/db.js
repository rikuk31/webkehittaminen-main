const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // vaihda omiin PostgreSQL-yhteystietoihisi
  host: 'localhost',
  database: 'postgres',
  password: 'salasana',
  port: 5432,
});

module.exports = pool;
