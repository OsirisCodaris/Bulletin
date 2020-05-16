'use strict';
var express = require('express');
var router = express.Router();
var UsersController = require('../../middleware/usersControllers');
var ActivatorController = require('../../middleware/activatorControllers');

var Users = require('../../models/users')
// create new user
router.route('/')
    .get(UsersController.show)
    .post(UsersController.mailExist,ActivatorController.create,UsersController.create)
    .put(UsersController.updated)

router.route('/:id')
    .delete(ActivatorController.deleted,UsersController.deleted)

router.route('/auth')
    .post(UsersController.check,ActivatorController.isValid,UsersController.auth)

module.exports = router;
