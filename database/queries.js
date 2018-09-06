const mysql = require('promise-mysql');

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'dictionary',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = {
  postObject: obj => conn.query('INSERT INTO data SET ?', obj),
};
