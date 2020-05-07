'use strict';
var express = require('express');
var router = express.Router();
var fileController = require('../../middleware/fileControllers');

// view file by id user
router.route('/show/:id')
    .get(fileController.show)
// download file 
router.route('/download/:name')
    .get(fileController.download)
// upload file
router.route('/upload')
    .post(fileController.upload)
// delete
router.route('/delete/:id')
    .delete(fileController.delete)

module.exports = router;
