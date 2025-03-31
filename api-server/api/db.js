const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sql.wsfdb.cn',
  port: 3306,
  user: 'freeqieqieengtochin1',
  password: 'wyf6k2yx',
  database: 'freeqieqieengtochin1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
