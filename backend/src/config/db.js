const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "campus_platform",
  password: "Om140103",
  port: 5432,
});

module.exports = pool;