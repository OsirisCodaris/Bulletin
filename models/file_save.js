let connection = require('../config/db')
let randkey = require('random-keygen');

class SaveFile {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }
    get id_user() {
        return this.row.id_user
    }
    get name() {
        return this.row.name
    }
    get file() {
        return this.row.file
    }

    get created_at() {
        return this.row.created_at
    }
    

    static showAll(cb) {
        connection.query('SELECT * FROM save_file', (err, result) => {
            if (err) throw err
            cb(result.map((row) => new SaveFile(row)))
        })
    }
    static show(data, cb) {
        if (data.id && data.id > 0) {
            connection.query('SELECT * FROM save_file WHERE id=? LIMIT 1', [data.id], (err, result) => {
                if (err) throw err
                cb(new SaveFile(result[0]))
            })
        }
        else if (data.name) {
            connection.query('SELECT * FROM save_file WHERE name=? LIMIT 1', [data.name], (err, result) => {
                if (err) throw err
                cb(new SaveFile(result[0]))
            })
        }
        else if (data.file) {
            connection.query('SELECT * FROM save_file WHERE file=? LIMIT 1', [data.file], (err, result) => {
                if (err) throw err
                cb(new SaveFile(result[0]))
            })
        }
        else if (data.id_user && data.id_user > 0) {
            connection.query('SELECT * FROM save_file WHERE id_user=?', [data.id_user], (err, result) => {
                if (err) throw err
                cb(result)
            })
        }
    }

    static update(data, cb) {
        connection.query('UPDATE FROM save_file SET valid_for = ?, updated_at = ? WHERE id = ?', [data.valid_for, data.updated_at, data.id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static delete(data, cb) {
        connection.query('DELETE FROM save_file WHERE id = ?', [data.id], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
    static add(data, cb) {

        var date = new Date();
        connection.query('INSERT INTO save_file SET id_user = ?,name =?, file = ?,created_at = ?', [data.id_user, data.name, data.file, date], (err, result) => {

            cb(result)
        })
    }
}
module.exports = SaveFile