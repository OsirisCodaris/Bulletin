let connection = require('../config/db')
let encrypt = require('encrypt-password')
let randkey = require('random-keygen');

class Users {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }

    static showAll(cb) {
        connection.query('SELECT * FROM users', (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static show(data, cb) {
        if (data.id && data.id>0) {
            connection.query('SELECT * FROM users WHERE id=? LIMIT 1', [data.id], (err, result) => {
                if (err) throw err
                cb(result[0])
            })
        }
       else if (data.email) {
            connection.query('SELECT * FROM users WHERE email=? LIMIT 1', [data.email], (err, result) => {
                if (err) throw err
                cb(result[0])
            })
        }
        else if (data.id_key) {
            connection.query('SELECT * FROM users WHERE id_key = ? LIMIT 1', [data.id_key], (err, result) => {
                if (err) throw err
                cb(result[0])
            })
            }
    }

    static update(data, cb) {
        if(data.password){
            let password = encrypt(data.password)
            let reset = randkey.get({
                length: 25,
                numbers: true
            });
            connection.query('UPDATE users SET nom = ? , prenom = ? , email = ? , contact= ?, etablissement = ?,  password = ?,reset_token= ? WHERE id = ?', [data.nom,data.prenom,data.email,data.contact,data.etab, password, reset,data.id], (err, result) => {
                cb(result)
            })
        }else{
            connection.query('UPDATE users SET nom = ? , prenom = ? , email = ? , contact= ?, etablissement = ? WHERE id= ?', [data.nom,data.prenom,data.email,data.contact,data.etab,data.id], (err, result) => {
                cb(result)
            })
        }
       
    }
    static add(data, cb) {
        let password = encrypt(data.password)
        let reset = randkey.get({
            length: 25,
            numbers: true
        });
        connection.query('INSERT INTO users SET nom = ? , prenom = ? , email = ? , contact= ?, etablissement = ?, id_key =  ?,  password = ?,reset_token= ?', [data.nom,data.prenom,data.email,data.contact,data.etab,data.id_key, password, reset], (err, result) => {

            cb(result)
        })
    }
    static delete(data,cb){
        connection.query('DELETE from users WHERE id= ?', [data.id], (err, result) => {
            cb(result)
        })
    }
}
module.exports = Users