let connection = require('../config/db')
let moment = require ('moment')

class Connect {
    static showAll(cb){
        connection.query('SELECT * FROM pc_connect', (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static add(data,cb){
        var date =  moment().format();
        connection.query('INSERT INTO pc_connect SET id_user= ?, created_at = ?', [data.id,date], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
}
module.exports = Connect