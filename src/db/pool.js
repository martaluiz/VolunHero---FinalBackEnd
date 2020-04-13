const pg = require("pg");

const pool = new pg.Pool({
  // connectionString: process.env.DATABASE_URL || ""

  user: "final",
  password: "final",
  host: "localhost",
  database: "final",
});

client
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = pool;

// const { Pool } = require(`pg`);
// const pool = new Pool({
//   user: 'final',
//   password: 'final',
//   host: 'localhost',
//   database: 'final',
// });

// module.exports = pool;
