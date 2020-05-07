'use strict';
var express = require('express');
var router = express.Router();
var visitors = require('../middleware/visitorControllers')

/* GET home page. */
router.get('/', function (req, res) {
    visitors.Increment()
    res.render('home', { title: 'Bull App' });
});
router.get('/documentation', function (req, res) {
    visitors.Increment()
    res.render('doc', { title: 'Documentation' });
});
router.get('/documentation/:page', function (req, res) {
    res.render("components/"+req.params.page);
});

module.exports = router;
