const { postgraphile } = require('postgraphile');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const dbUrl = process.env.DATABASE_URL;

// Configure SSL for PostgreSQL connection
const pgConfig = {
  connectionString: dbUrl,
  ssl: dbUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : false
};

app.use(
  postgraphile(pgConfig, 'public', {
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
