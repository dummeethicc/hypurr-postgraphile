const { postgraphile } = require('postgraphile');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;
const dbUrl = process.env.DATABASE_URL;

// Create PostgreSQL pool with SSL configuration
const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(
  postgraphile(pool, 'public', {
    watchPg: false,
    graphiql: true,
    enhanceGraphiql: true,
    dynamicJson: true,
    enableCors: true,
    ignoreRBAC: false,
    ignoreIndexes: false,
    retryOnInitFail: true,
  })
);

app.listen(port, '0.0.0.0', () => {
  console.log(`PostGraphile server listening on http://0.0.0.0:${port}`);
});
