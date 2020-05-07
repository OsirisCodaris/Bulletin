let connection = require('../config/db')


class Visitors {
    static show(cb){
        connection.query('SELECT * FROM visitors WHERE id=1 LIMIT 1', (err, result) => {
            if (err) throw err
            cb(result[0])
        })
    }
    static update(data,cb){
        connection.query('UPDATE visitors SET count = ? WHERE id= ?', [data.count, data.id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
}
module.exports = Visitors