'use strict';
var express = require('express');
var router = express.Router();
var AdminController = require('../../middleware/adminControllers');
// create new user
/*router.route('/')
    .post(AdminController.create)*/
// authentification user
router.route('/')
    .get(AdminController.show)
    .put(AdminController.update)
    .post(AdminController.create)

router.route('/:id')
    .delete(AdminController.deleted)
module.exports = router;
