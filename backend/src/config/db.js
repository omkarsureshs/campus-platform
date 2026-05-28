const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(client => {
    return client.query("SELECT current_database(), current_user")
      .then(res => {
        console.log("CONNECTED TO DB:", res.rows);
        client.release();
      });
  })
  .catch(err => console.error("DB CONNECTION ERROR:", err));