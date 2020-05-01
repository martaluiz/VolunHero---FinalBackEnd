const pg = require("pg");

const pool = new pg.Pool({
  user: "final",
  password: "final",
  host: "localhost",
  database: "final",
});

pool
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = pool;
