const mysql = require("mysql2");
const config = {
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `api`,
};
const pool = mysql.createPool(config);
module.exports = pool;
