'use strict';
var express = require('express');
var router = express.Router();
var visitorController = require('../../middleware/visitorControllers');

router.route('/')
    .get(visitorController.Counter)

module.exports = router;
