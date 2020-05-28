let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'mysql1006.mochahost.com',
    user: 'coda18',
    password: 'c160916',
    port: 3306,
    database: 'coda18_bull'
});
connection.connect()

module.exports = connection