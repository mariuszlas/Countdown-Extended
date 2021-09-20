const { Pool } = require('pg');

const uri = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false }
      }
    : null;

const pool = new Pool(uri);

module.exports = pool;
