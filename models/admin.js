let connection = require('../config/db')
let encrypt = require('encrypt-password')
let randkey = require('random-keygen');

class Admins {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }

    static showAll(cb) {
        connection.query('SELECT * FROM admin', (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static show(data, cb) {
        if (data.id && data.id>0) {
            connection.query('SELECT * FROM admin WHERE id=? LIMIT 1', [data.id], (err, result) => {
                if (err) throw err
                cb(new Admins(result[0]))
            })
        }
       else if (data.email) {
            connection.query('SELECT * FROM admin WHERE email=? LIMIT 1', [data.email], (err, result) => {
                if (err) throw err
                cb(new Admins(result[0]))
            })
        }
    }

    static update(data, cb) {
        connection.query('UPDATE admin SET password = ? WHERE email= ?', [data.password, data.email], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static del(data, cb) {
        
        connection.query('DELETE from admin WHERE id= ?', [data.id], (err, result) => {
            cb(result)
        })
    }
    static add(data, cb) {
        let reset = randkey.get({
            length: 25,
            numbers: true
        });
        connection.query('INSERT INTO admin SET email = ?, password = ?,reset_token= ?', [data.email, data.password, reset], (err, result) => {

            cb(result)
        })
    }
}
module.exports = Admins