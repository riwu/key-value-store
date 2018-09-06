const mysql = require('promise-mysql');

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'dictionary',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = {
  getObject: (key, timestamp) => conn
    .query(
      `SELECT value FROM data WHERE \`key\` = ?${
        timestamp === undefined ? '' : ' AND timestamp <= ?'
      } ORDER BY timestamp DESC LIMIT 1`,
      [key, timestamp],
    )
    .then(([row]) => (row || {}).value),

  postObject: obj => conn.query('INSERT INTO data SET ?', obj),
};
