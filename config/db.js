let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3308,
    database: 'bullapp'
});
connection.connect()

module.exports = connection