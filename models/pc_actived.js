let connection = require('../config/db')
let randkey = require('random-keygen');

class ActivePc {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }
    get id_key() {
        return this.row.id_key
    }
    get id_user() {
        return this.row.id_user
    }
    get adresse_mac() {
        return this.row.adresse_mac
    }
    get created_at() {
        return this.row.created_at
    }
   

    static showAll(cb) {
        connection.query('SELECT * FROM pc_active', (err, result) => {
            if (err) throw err
            cb(result.map((row) => new ActivePc(row)))
        })
    }
    static show(data, cb) {
        if (data.id_key && data.id_key > 0) {
            connection.query('SELECT * FROM pc_active WHERE id_key =?', [data.id_key], (err, result) => {
                if (err) throw err
                cb(result.map((row) => new ActivePc(row)))
            })
        }
        else if (data.adresse_mac) {
            connection.query('SELECT * FROM pc_active WHERE adresse_mac=?', [data.adresse_mac], (err, result) => {
                if (err) throw err
                cb(result.map((row) => new ActivePc(row)))
            })
        } 
    }

    static add(data, cb) {
        var date = new Date();
        connection.query('INSERT INTO pc_active SET id_key = ?,id_user =?, adresse_mac = ?,created_at = ?', [data.id_key, data.id, data.adresse_mac, date], (err, result) => {
            cb(result)
        })
    }
}
module.exports = ActivePc