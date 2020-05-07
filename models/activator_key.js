let connection = require('../config/db')
let randkey = require('random-keygen');

class Activator {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }
    get key_gen() {
        return this.row.key_gen
    }
    get number_pc() {
        return this.row.number_pc
    }
    get valid_for() {
        return this.row.valid_for
    }
    get created_at() {
        return this.row.created_at
    }
    get updated_at() {
        return this.row.updated_at
    }

    static showAll(cb) {
        connection.query('SELECT * FROM activator_key', (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static show(data, cb) {
        if (data.id_key && data.id_key > 0) {
            connection.query('SELECT * FROM activator_key WHERE id=? LIMIT 1', [data.id_key], (err, result) => {
                if (err) throw err
                cb(result[0])
            })
        }
        else if (data.key_gen) {
            connection.query('SELECT * FROM activator_key WHERE key_gen=? LIMIT 1', [data.key_gen], (err, result) => {
                if (err) throw err
                cb(result[0])
            })
        }
    }

    static update(data, cb) {
        var date = new Date();
        if(data.valid_for){
            connection.query('UPDATE activator_key SET valid_for = ?, updated_at = ? WHERE id = ?', [data.valid_for, date,data.id], (err, result) => {
                if (err) throw err
                cb(result)
            })
        }else if(data.number_pc){
            connection.query('UPDATE activator_key SET number_pc = ?, updated_at = ? WHERE id = ?', [data.number_pc, date,data.id], (err, result) => {
                if (err) throw err
                cb(result)
            })
        }
        
    }
    static add(data, cb) {

        var date = new Date();
        connection.query('INSERT INTO activator_key SET key_gen = ?,number_pc =?, valid_for = ?,created_at = ?, updated_at = ?', [data.key_gen, data.number_pc, data.valid_for, date, date], (err, result) => {

        cb(result)
        })
    }
}
module.exports = Activator