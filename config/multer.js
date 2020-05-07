const multer = require('multer');
var path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/savefolder');
    },
    
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage,
    limits: {
        files: 1, // allow up to 5 files per request,
        fileSize: 20 * 1024 * 1024 // 2 MB (max file size)
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls' && ext !== '.csv') {
            callback(new Error('Seul les fichiers Excel sont acceptés'))
        }
        else{
            callback(null, true)
        }
    }
})

module.exports =upload;