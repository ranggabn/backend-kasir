var mysql = require("mysql");

const pool = mysql.createPool({
  host: "203.175.8.17",
  port: "3306",
  user: "prer4841_kasir",
  password: "kasrikasir123",
  database: "prer4841_kasir",
});

// ... later
pool.query("select 1 + 1", (err, rows) => {
  /* */
});

module.exports = pool;
