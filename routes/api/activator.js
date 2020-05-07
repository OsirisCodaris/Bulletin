'use strict';
var express = require('express');
var router = express.Router();
var activatorController = require('../../middleware/activatorControllers');
//var Users = require('../../models/activator_key')
// create new user
router.route('/')
    .get(activatorController.show)
    .put(activatorController.updated)

module.exports = router;
