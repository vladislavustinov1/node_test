const mysql = require("mysql2");
const config = {
  host: `localhost`,
  user: `root`,
  password: `Ou08194321003456123`,
  database: `api`,
};
const pool = mysql.createPool(config);
module.exports = pool;
