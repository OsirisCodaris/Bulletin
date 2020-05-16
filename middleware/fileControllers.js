let SaveFile = require('../models/file_save')
var multer = require('multer')
var uploader = require('../config/multer').single('file')

let fileControllers = {

    delete: function (req, res) {
        let data = parseInt(req.params.id)
        SaveFile.delete({ id: data }, (rows) => {
          if (rows.message) {
                res.status(500).end(rows.message)
                return
            } else {
                res.status(200).send("Fichier supprimé")
                return
            }
        })
    },
    show: function (req, res) {
        let data = req.params
        SaveFile.show({ id_user: data.id }, (rows) => {
            if (rows.length >0) {
                res.status(200).json(rows)
                return
            } else {
                res.status(404).end("Pas de Contenu")
                return
            }
        })
    },
    showAll: function (req, res) {
        SaveFile.showAll((rows) => {
            if (rows.length >0) {
                res.status(200).json(rows)
                return
            } else {
                res.status(404).end("Pas de Contenu")
                return
            }
        })
    },
    download: function (req, res) {
        var fileName = req.params.name
        SaveFile.show({ file: fileName }, (rows) => {
            if (rows.row) {
                res.download('public/savefolder/' + fileName, rows.row.name, (err) => {
                    if (err) {
                        return res.status(500).end(err.message);
                    } 
                })
                return
            } else {
                return res.status(400).end("Le fichier n'existe plus ou a été supprim�");
            }
        })
    },
    upload: function (req, res) {

        uploader(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).send( err.message);
            } else if (err) {
                return res.status(400).send(err.message);
            }
            let data = req.body
            data.name = req.file.originalname
            data.file = req.file.filename
            SaveFile.add(data, (rows) => {
                if (rows.message) {

                    return res.status(500).send( rows.message );
                } else {
                    return res.status(200).send("Fichier enregistré");
                }
            })
        });
    }

}

module.exports = fileControllers